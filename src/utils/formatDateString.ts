import { format, parseISO } from 'date-fns';

const formatDateString = (dateString: string) => {
  return format(parseISO(dateString), 'dd MMM yyyy');
};

export default formatDateString;
