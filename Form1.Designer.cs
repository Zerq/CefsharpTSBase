namespace CefSharpBaseProject {
    partial class Form1 {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing) {
            if (disposing && (components != null)) {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent() {
            browserPanel = new Panel();
            winFormMenu = new MenuStrip();
            browserPanel.SuspendLayout();
            SuspendLayout();
            // 
            // browserPanel
            // 
            browserPanel.BackColor = Color.IndianRed;
            browserPanel.Controls.Add(winFormMenu);
            browserPanel.Dock = DockStyle.Fill;
            browserPanel.ForeColor = SystemColors.ControlText;
            browserPanel.Location = new Point(0, 0);
            browserPanel.Name = "browserPanel";
            browserPanel.Size = new Size(1807, 887);
            browserPanel.TabIndex = 0;
            // 
            // winFormMenu
            // 
            winFormMenu.ImageScalingSize = new Size(20, 20);
            winFormMenu.Location = new Point(0, 0);
            winFormMenu.Name = "winFormMenu";
            winFormMenu.Size = new Size(1807, 28);
            winFormMenu.TabIndex = 0;
            winFormMenu.Text = "menu";
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(1807, 887);
            Controls.Add(browserPanel);
            MainMenuStrip = winFormMenu;
            Name = "Form1";
            Text = "Form1";
            FormClosing += Form1_FormClosing;
            Load += Form1_Load;
            KeyUp += Form1_KeyUp;
            browserPanel.ResumeLayout(false);
            browserPanel.PerformLayout();
            ResumeLayout(false);
        }

        #endregion

        private Panel browserPanel;
        private MenuStrip winFormMenu;
    }
}