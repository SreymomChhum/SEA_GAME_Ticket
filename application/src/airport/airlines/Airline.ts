import { Booking } from "../../booking/Booking";
import { Mealtype } from "../../booking/mealType/MealType";
import { Employee } from "../../person/Employee";
import { AirplineManager } from "../../person/airlineStaff/AirlineManager";
import { AirlinePilot } from "../../person/airlineStaff/AirlinePilot";
import { Passenger } from "../../person/passenger/Passenger";
import { DateTime } from "../dateTime/DateTime";
import { Flight } from "../trip/flight/Flight";

export class Airline {

    constructor(private airlineCode: string,
        private airlineName: string,
        private airlineManager: AirplineManager,
        private employees: Employee[],
        private bookings: Booking[]) { }

    // get bookings
    public getBooking = (): Booking[] => this.bookings;

    // add booking
    public addBooking = (...bookings: Booking[]): void => {
        for (let booking of bookings) {
            this.bookings.push(booking)
        }
    };

    // passengers have return tickets
    public getPassengerReturnTickets = (flight: Flight) => {
        let listPassengers: Passenger[] = []
        for (let booking of this.bookings) {
            if (booking.isFlight(flight) && booking.isReturn()) {
                listPassengers.push(booking.getPassenger());
            };
        };
        return listPassengers;
    };

    //is Employee
    public isPilot = (pilot: AirlinePilot): boolean => {
        for (let employee of this.employees) {
            if (employee instanceof AirlinePilot) {
                if (pilot === employee) {
                    return true
                }
            }
        }
        return false
    };

    // join flights of pilot
    public getPilotFlight = (pilot: AirlinePilot, dateTime: DateTime): number | string => {
        let totalFlight: number | string = 0;
        if (this.isPilot(pilot)) {
            for (let booking of this.bookings) {
                totalFlight += booking.getNumberOfFlights(pilot, dateTime);
            }
        } else {
            totalFlight = `Undefined this Pilot`;
        }
        return totalFlight;
    }

    //get type of meal
    public getTypeOfMeal = (flight: Flight) => {
        let listOfMeal: string[] = [];
        for (let booking of this.bookings) {
            if (booking.isFlight(flight)) {
                listOfMeal.push(Mealtype[booking.getMealType()]);
            };
        };
        return listOfMeal;
    };

    // get total saraly
    public getTotalSalaryOfEmployees = () => {
        let totalSalary: number = 0;
        for (let employee of this.employees) {
            totalSalary += employee.getSalary();
        }
        return totalSalary;
    };
}