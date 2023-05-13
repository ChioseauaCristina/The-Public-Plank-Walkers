using Microsoft.Maui.Graphics.Text;
using Newtonsoft.Json;
using System.Text;
using static System.Net.Mime.MediaTypeNames;

namespace InterestPointClient;

public partial class LoginPage : ContentPage
{
    public LoginPage()
    {
        InitializeComponent();


        Label label1 = new Label { Text = "Welcome!", FontSize = 32, HorizontalOptions = LayoutOptions.Center };
        Label label2 = new Label { Text = "Log in to your account", FontSize = 18, HorizontalOptions = LayoutOptions.Center };

        


        var frame1 = new Frame
        {
            BorderColor = Color.FromRgba("#ffffff"),
            CornerRadius = 28,
            HorizontalOptions = LayoutOptions.Center,
            Padding = 20,
        };

        var usernameEntry = new Entry
        {
            Placeholder = "User Name",
            VerticalOptions = LayoutOptions.CenterAndExpand
        };

        var stackLayout1 = new StackLayout
        {
            Orientation = StackOrientation.Vertical,
            Children =
                {
                    frame1,
                    new Frame
                    {
                        HeightRequest = 100,
                        WidthRequest = 350,
                        BorderColor = Color.FromRgba("#ffffff"),
                        HorizontalOptions = LayoutOptions.Center,
                        HasShadow = true,
                        CornerRadius = 28,
                        Content = usernameEntry
                    }
                }
        };

        var frame2 = new Frame
        {
            BorderColor = Color.FromRgba("#ffffff"),
            CornerRadius = 28,
            HorizontalOptions = LayoutOptions.Center,
        };

        var passwordEntry = new Entry
        {
            
            Placeholder = "Password",
            IsPassword = true,
            VerticalOptions = LayoutOptions.CenterAndExpand
        };

        var stackLayout2 = new StackLayout
        {
            Orientation = StackOrientation.Vertical,
            Children =
                {
                    frame2,
                    new Frame
                    {
                        HeightRequest = 100,
                        WidthRequest = 350,
                        HasShadow = true,
                        BorderColor = Color.FromRgba("#ffffff"),
                        CornerRadius = 28,
                        HorizontalOptions = LayoutOptions.CenterAndExpand,
                        Content = passwordEntry,
                    }
                }
        };

        var verticalStackLayout = new VerticalStackLayout
        {
            Spacing = 5,
            VerticalOptions = LayoutOptions.Center,
            Children =
                {
                    label1,
                    label2
                }
        };

        var mainVerticalStackLayout = new VerticalStackLayout
        {
            Children =
                {
                    verticalStackLayout,
                    stackLayout1,
                    stackLayout2,
                    

                }
        };

        Content = mainVerticalStackLayout;

        Button loginButton = new Button
        {

            Text = "Log in",
            CornerRadius = 28,
            HorizontalOptions = LayoutOptions.CenterAndExpand,
            VerticalOptions = LayoutOptions.CenterAndExpand,
            Padding=30
        };
        mainVerticalStackLayout.Children.Add(loginButton);



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
                await Navigation.PushAsync(new MainPage());
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