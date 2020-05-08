using EventStore.ClientAPI.SystemData;
using EventStore.ClientAPI.UserManagement;
using System.Linq;
using System.Threading.Tasks;

namespace DocsExample
{
    public static class UsersManagerExtensions
    {
        public static async Task AddUserToGroupAsync(this UsersManager usersManager, string userLogin, string group, UserCredentials credentials)
        {
            var user = await usersManager.GetUserAsync(userLogin, credentials);
            var groups = user.Groups.ToList();
            if (groups.Contains(group)) return;
            groups.Add(group);
            await usersManager.UpdateUserAsync(user.LoginName, user.FullName, groups.ToArray(), credentials);
        }

        public static async Task RemoveUserFromGroupAsync(this UsersManager usersManager, string userLogin, string group, UserCredentials credentials)
        {
            var user = await usersManager.GetUserAsync(userLogin, credentials);
            var groups = user.Groups.ToList();
            if (!groups.Contains(group)) return;
            groups.Remove(group);
            await usersManager.UpdateUserAsync(user.LoginName, user.FullName, groups.ToArray(), credentials);
        }
    }
}