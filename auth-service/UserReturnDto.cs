public class UserReturnDto 
{
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;

    public UserReturnDto(string Username, string Email, string Token)
    {
        this.Username = Username;
        this.Email = Email;
        this.Token = Token;
    }
}