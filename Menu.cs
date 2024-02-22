using CefSharp;
using CefSharp.WinForms;
using System.Text.Json;

namespace CefSharpBaseProject {

    public class AddMenuItemEventArgs : EventArgs {
        public string ItemName { get; set; }
        public dynamic EventValue { get; set; }
    }

    public class Menu {
        private MenuStrip menu;
        private ChromiumWebBrowser browser;
        private Form1 form;
        public Menu(MenuStrip menu, ChromiumWebBrowser browser, Form1 form) {
            this.menu = menu;
            this.browser = browser;
            this.form = form;   
        }



        public Action PopulatebaseAction {get;set;}

        public void Populatebase() {
            PopulatebaseAction();
        }


        public void AddItem(string item, dynamic eventValue) {
            this.form.Invoke((MethodInvoker)delegate () {
                var menuItem = this.menu.Items.Add(item);
                menuItem.Click += (o, x) => {
                    var json = JsonSerializer.Serialize(eventValue);
                    this.browser.ExecuteScriptAsync($@"EventPipe.Send(""menuEvent"", {json})");
                };
            });
        }
    }

}