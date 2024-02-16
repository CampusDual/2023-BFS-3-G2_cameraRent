import { Component } from "@angular/core";
import { ThemeService } from "../shared/theme.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent {
  public light: boolean;

  constructor(protected _themeService: ThemeService) {}

  ngOnInit() {
    const currentTheme = this._themeService.getStoredTheme();
    if (currentTheme.isDark) {
      this.light = false;
      this._themeService.installTheme(currentTheme);
    } else {
      this.light = true;
      this._themeService.installTheme(currentTheme);
    }
  }

  light_mode() {
    const currentTheme = this._themeService.getStoredTheme();
    currentTheme.isDark = false;
    this._themeService.installTheme(currentTheme);
    this.light = true;
  }

  dark_mode() {
    const currentTheme = this._themeService.getStoredTheme();
    currentTheme.isDark = true;
    this._themeService.installTheme(currentTheme);
    this.light = false;
  }
}
