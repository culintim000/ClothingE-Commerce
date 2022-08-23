using Microsoft.EntityFrameworkCore;

public class UserDb : DbContext
{
    // TODO right now we use a completely new db, question is do we need to?
    public UserDb(DbContextOptions<UserDb> options) : base(options) { }
    public DbSet<User> Users => Set<User>();
    
    public UserDb()
    {

    }
}
