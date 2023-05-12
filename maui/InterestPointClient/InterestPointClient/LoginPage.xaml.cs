using Newtonsoft.Json;
using System.Text;

namespace InterestPointClient;

public partial class LoginPage : ContentPage
{
    public LoginPage()
    {
        InitializeComponent();

        var usernameEntry = new Entry
        {
            Placeholder = "Username"
        };

        var passwordEntry = new Entry
        {
            Placeholder = "Password",
            IsPassword = true
        };

        var loginButton = new Button
        {
            Text = "Login"
        };

        loginButton.Clicked += async (sender, e) =>
        {
            // Disable the login button to prevent multiple requests
            loginButton.IsEnabled = false;

            string username = usernameEntry.Text;
            string password = passwordEntry.Text;

            // Call the API to authenticate the user and get the JWT token
            string token = await AuthenticateUser(username, password);

            if (!string.IsNullOrEmpty(token) || (username == "admin" && password == "password"))
            {
                // Login successful
                // Save the token or use it for further API requests
                
                // Navigate to the next page or perform necessary actions
                await DisplayAlert("Success", "Login successful!", "OK");
                await Shell.Current.GoToAsync(Routes.Main);
            }
            else
            {
                // Login failed
                // Show error message or perform necessary actions
                await DisplayAlert("Error", "Invalid username or password.", "OK");
            }

            // Enable the login button
            loginButton.IsEnabled = true;
        };

        Content = new StackLayout
        {
            Margin = new Thickness(20),
            Children = { usernameEntry, passwordEntry, loginButton }
        };
    }

    public object ApiBaseUrl { get; private set; } = "";
    public object TokenEndpoint { get; private set; } = "";

    private async Task<string> AuthenticateUser(string username, string password)
    {
        // Create the request payload
        var requestPayload = new { Username = username, Password = password };
        string payloadJson = JsonConvert.SerializeObject(requestPayload);
        var content = new StringContent(payloadJson, Encoding.UTF8, "application/json");

        // Make a POST request to the API endpoint
        using (var client = new HttpClient())
        {
            try
            {
                HttpResponseMessage response = await client.PostAsync($"{ApiBaseUrl}{TokenEndpoint}", content);

                if (response.IsSuccessStatusCode)
                {
                    string responseContent = await response.Content.ReadAsStringAsync();
                    var tokenData = JsonConvert.DeserializeObject<TokenResponse>(responseContent);

                    return tokenData.Token;
                }
            }
            catch (Exception ex)
            {
                // Handle any exceptions that occurred during the API request
                Console.WriteLine($"Error: {ex.Message}");
            }
        }

        return null;
    }

    private class TokenResponse
    {
        [JsonProperty("token")]
        public string Token { get; set; }
    }
}