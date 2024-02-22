using CefSharp;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

namespace CefSharpBaseProject {
    internal static class Program {
 
        [STAThread]
        static void Main(){ 
            ApplicationConfiguration.Initialize();
            var mainForm = new Form1();    
            Application.Run(mainForm);
        }
    }
}