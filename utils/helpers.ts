import { differenceInDays, formatDistance, parseISO } from "date-fns";
export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

interface IOptions {
  end?: boolean;
}

export const getToday = (options?: IOptions): string => {
  const today = new Date();
  if (options?.end) {
    today.setUTCHours(23, 59, 59, 999);
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }

  return today.toISOString();
};

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

export const subtractDates = (dateStr1: string, dateStr2: string) =>
  differenceInDays(parseISO(dateStr1), parseISO(dateStr2));

