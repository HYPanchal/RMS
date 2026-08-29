import { Injectable } from "@angular/core";
import { State, City, IState, ICity } from "country-state-city";

@Injectable({ providedIn: 'root' })
export class LocationService {
  // Hardcoded to India since this is an RMS app for Indian properties
  private readonly countryCode = 'IN';

  getStates(): IState[] {
    return State.getStatesOfCountry(this.countryCode);
  }

  getCitiesByStateCode(stateCode: string): ICity[] {
    return stateCode ? City.getCitiesOfState(this.countryCode, stateCode) : [];
  }
}