import { from, Observable } from 'rxjs';
export class NavigatorUtil {
  public static getGeoLocationCurrentPosition(): Observable<Position> {
    return from(new Promise<Position>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }));
  }
}
