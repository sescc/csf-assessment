import { ActivatedRouteSnapshot, CanDeactivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { PictureComponent } from "./views/picture.component";
import { Observable } from "rxjs";
import { inject } from "@angular/core";

export const leavePicture: CanDeactivateFn<PictureComponent> =
(comp: PictureComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> => {

    // const router = inject(Router);

    return confirm("Do you wish to discard the picture and return to the previous page?")

}
