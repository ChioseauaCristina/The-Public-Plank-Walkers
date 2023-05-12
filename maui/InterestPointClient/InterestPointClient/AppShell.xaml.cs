namespace InterestPointClient;

public partial class AppShell : Shell
{
	public AppShell()
	{
		InitializeComponent();

		Routing.RegisterRoute(Routes.Login, typeof(LoginPage));
		Routing.RegisterRoute(Routes.Main, typeof(MainPage));
	}
}
