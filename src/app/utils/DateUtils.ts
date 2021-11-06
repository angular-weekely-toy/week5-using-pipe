export class DateUtils {
 static plusDays(date: Date, days: number): Date {
   const newDate = new Date(date);
   newDate.setDate(newDate.getDate() + days);
   return newDate;
 }
 static miusDays(date: Date, days: number): Date {
   const newDate = new Date(date);
   newDate.setDate(newDate.getDate() - days);
   return newDate;
 }
}
