using EventStore.ClientAPI.Common.Log;
using EventStore.ClientAPI.UserManagement;
using System;
using System.Net;

namespace DocsExample
{
    public class UsersCreateUsersManager
    {
        public static void Method(){
            var hostInfo = Dns.GetHostEntry("localhost");
            var manager = new UsersManager(new ConsoleLogger(), new IPEndPoint(hostInfo.AddressList[0], 2113), TimeSpan.FromSeconds(10));
        }
    }
}