using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Controllers
{
    [ApiController]
    [Route("auth")]
    public class UserController : ControllerBase
    {
        private readonly User _db;

        public UserController(ILogger<UserController> logger, User db)
        {            
            _db = db;
        }

        [HttpGet("abc")]
        public ActionResult<string> abc()
        {
            return "hello from abc";
        }

        // [HttpPost("")]
        // public async Task<IResult> PostItem(User user)
        // {
        //     _db.Users.Add(user);
        //     await _db.SaveChangesAsync();
        //     return Results.Created($"/{user.Username}", user);
        // }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<User>> GetItem(long id)
        // {
        //     var item = await _db.Users.FindAsync(id);

        //     if(item == null)
        //     {
        //         return NotFound();
        //     }
        //     return Ok(item);
        // }

        // [HttpGet("allitems")]
        // public async Task<ActionResult<List<User>>> GetAllItems()
        // {
        //     return await _db.Users.ToListAsync<User>();
        // }
        
        // [HttpPut]
        // public async Task<IResult> PutItem(User user)
        // {
        //     _db.Users.Update(user);

        //     await _db.SaveChangesAsync();
        //     return Results.NoContent();
        // }

        // [HttpDelete("{id}")]
        // public async Task<IResult> DeleteItem(long id)
        // {
        //     System.Console.WriteLine("Item " + id + " was requested to be deleted");
        //     var user = await _db.Users.FindAsync(id);

        //     if(user is null)
        //         return Results.NotFound();

        //     _db.Users.Remove(user);
        //     await _db.SaveChangesAsync();
        //     return Results.Ok(user);
        // }
    }
}