using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Whiteboard.Hubs
{
    public class OnlineHub : Hub
    {
        public void JoinGroup(string groupName)
        {
            Groups.Add(Context.ConnectionId, groupName);
        }

        public void SendDraw(string drawObject, string groupName, string clientId)
        {
            Clients.Group(groupName).HandleDraw(drawObject, clientId);
        }
        
    }
}