using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Controllers
{
    [ApiController]
    [Route("auth")]
    public class UserController : ControllerBase
    {
        private readonly User _db;
        private readonly IConfiguration _configuration;

        public UserController(ILogger<UserController> logger, User db, IConfiguration configuration)
        {
            _db = db;
            _configuration = configuration;
        }

        [HttpGet("abc")]
        public ActionResult<string> abc()
        {
            return "hello from abc";
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            // make sure user doesn't already exist
            var checkUser = await _db.Users.FindAsync(request.Username);
            if (checkUser != null)
            {
                return BadRequest("User already exists");
            }

            // make new user based off request dto
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            var newuser = new User
            {
                Username = request.Username,
                Email = request.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            // save user to db
            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            // return JWT based on user
            return Ok(CreateToken(newuser));
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDto request)
        {
            // find user exists on username OR email
            var user = await _db.Users.FindAsync(request.Username);
            if (user == null)
            {
                return BadRequest("User doesn't exist");
            }

            // validate password
            if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Wrong password.");
            }
            // return JWT token based on user
            return Ok(CreateToken(user));
        }

        // TODO update user

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                // new Claim(ClaimTypes.Role, "Admin")
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
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