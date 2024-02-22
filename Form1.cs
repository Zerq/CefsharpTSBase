using CefSharp;
using CefSharp.WinForms;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;
using System.Reflection.Emit;
using System.Text.Json;
using System.Text.Json.Serialization;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

namespace CefSharpBaseProject {
    public partial class Form1 : Form {
        public Form1() {
            InitializeComponent();

            menuBaseRendered += Form1_menuBaseRendered;
            itemAddedToMenu += Form1_itemAddedToMenu;

            this.browser = new ChromiumWebBrowser();
            this.browser.Dock = DockStyle.Fill;

            this.browser.JavascriptObjectRepository.Settings.LegacyBindingEnabled = true;
            this.browser.JavascriptObjectRepository.Settings.AlwaysInterceptAsynchronously = true;

            var menustrip = new Menu(this.winFormMenu, this.browser, this);
            menustrip.PopulatebaseAction = () => { this.menuBaseRendered.Invoke(this, new EventArgs()); };
                
            this.browser.JavascriptObjectRepository.Register("Menu", menustrip, options: BindingOptions.DefaultBinder);
        
            //this.browser.JavascriptObjectRepository.Register("serverSpeaker", this.speaker, options: BindingOptions.DefaultBinder);

            this.browserPanel.Controls.Add(browser);

            var builder = WebApplication.CreateBuilder();
            this.app = builder.Build();

            this.app.UseStaticFiles(new StaticFileOptions {
                FileProvider = new PhysicalFileProvider(
                Path.Combine(builder.Environment.ContentRootPath, "../../../wwwroot")),
                RequestPath = ""
            });

            this.app.UseRouting();
            this.app.MapGet("/test", () => "hello");

        }

        private readonly WebApplication app;
        private readonly ChromiumWebBrowser browser;

        private async void Form1_Load(object sender, EventArgs e) {
            var task = new Task(() => {
                this.app.Run("https://localhost:7841");
            });
            task.Start();
            this.browser.Load("https://localhost:7841/app/index.html");
  
        }
  
        private void Form1_itemAddedToMenu(object? sender, AddMenuItemEventArgs e) {

        }

        private void Form1_menuBaseRendered(object? sender, EventArgs e) {
            this.Invoke((MethodInvoker)delegate () {
             
               MainMenuStrip.Items.Clear();
                var reload = new ToolStripMenuItem("Reload", null);
                reload.Click += (o, e) => {
                    browser.Reload();
                };

                var dev = new ToolStripMenuItem("dev", null);
                dev.Click += (o, e) => {
                    browser.ShowDevTools();
                };

                var menuItem = new ToolStripMenuItem("Browser", null, reload, dev);
                this.MainMenuStrip.Items.Add(menuItem);
            });

        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e) {
            this.app.StopAsync();
            this.app.DisposeAsync();
        }

        private event EventHandler menuBaseRendered;
        private event EventHandler<AddMenuItemEventArgs> itemAddedToMenu;

        private void oldCrap() {
            // browser.Load("https://localhost:7841/app/index.html");
            // this.browser.ShowDevTools();
            // this.browser.ExecuteScriptAsync("globalThis.player.Play().then(()=> {})");
            // this.browser.ExecuteScriptAsync($@"Speaker.Done(""{args.Id}"")");
            //  this.speaker = new Speaker();
            //  this.speaker.SpeakingDone += Speaker_SpeakingDone;

        }

        private void Form1_KeyUp(object sender, KeyEventArgs e) {
            if (e.KeyCode == Keys.F5) {
                this.browser.Reload();
            }
            if (e.KeyCode == Keys.F12) {
                this.browser.ShowDevTools();
            }

        }

        private void derpReloadToolStripMenuItem_Click(object sender, EventArgs e) {
            browser.Reload();
        }

        private void derpToolStripMenuItem_Click(object sender, EventArgs e) {

        }

        private void devToolStripMenuItem_Click(object sender, EventArgs e) {
            browser.ShowDevTools();
        }
    }

}