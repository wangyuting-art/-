using System;
using CM.Models;
using CM.Services;

namespace ShowMenuCApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Service<cm_menu> svr = new Service<cm_menu>();
            foreach(var o in svr.GetList())
            {
                Console.WriteLine(o.name);
            }
            Console.ReadLine();
        }
    }
}
