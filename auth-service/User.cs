public class User
{
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? PasswordHash { get; set; }
    public string? PasswordSalt { get; set; }

    public override string ToString()
    {
        return Username + " : " + Email;
    }
}