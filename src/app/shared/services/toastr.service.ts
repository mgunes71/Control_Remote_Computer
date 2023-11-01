import {Injectable} from "@angular/core";
import {ToastrService} from 'ngx-toastr';

interface Config {
  message: string,
  title: 'success' | 'error'
}

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AlertService {
  constructor(private toastr: ToastrService) {
  }

  successAlert(config: Config) {
    this.toastr.success(config.message, config.title);
  }

  errorAlert(config: Config) {
    this.toastr.error(config.message, config.title);
  }
}
