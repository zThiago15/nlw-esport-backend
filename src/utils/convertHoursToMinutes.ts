export default function convertHoursToMinutes(hourString: string): number {
  const [hours, minutes] = hourString.split(':').map(Number);

  return (hours * 60) + minutes;
}