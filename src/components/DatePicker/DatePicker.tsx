import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { useClickOutside } from '../../hooks/useClickOutside';

export interface DatePickerProps {
  /**
   * The selected date
   */
  value?: Date;
  /**
   * Callback fired when the date changes
   */
  onChange?: (date: Date) => void;
  /**
   * The minimum selectable date
   */
  minDate?: Date;
  /**
   * The maximum selectable date
   */
  maxDate?: Date;
  /**
   * Whether the date picker is disabled
   */
  disabled?: boolean;
  /**
   * Placeholder text when no date is selected
   */
  placeholder?: string;
  /**
   * Additional CSS class name
   */
  className?: string;
}

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledInput = styled.input<{ hasValue: boolean }>`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  color: ${({ hasValue }) => (hasValue ? '#1f1f1f' : '#757575')};
  cursor: pointer;
  width: 150px;

  &:hover {
    border-color: #bdbdbd;
  }

  &:focus {
    outline: none;
    border-color: #4285f4;
    box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const Calendar = styled.div<{ open: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 1000;
  background: white;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 16px;
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-8px)')};
  transition: opacity 0.2s, visibility 0.2s, transform 0.2s;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const MonthYear = styled.div`
  font-weight: 500;
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #1f1f1f;
  }

  &:focus {
    outline: 2px solid #4285f4;
    outline-offset: 2px;
  }
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
  text-align: center;
  font-size: 12px;
  color: #666;
`;

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const Day = styled.button<{
  isToday?: boolean;
  isSelected?: boolean;
  isOutsideMonth?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: ${({ isSelected }) => (isSelected ? '#4285f4' : 'none')};
  color: ${({ isSelected, isOutsideMonth }) =>
    isSelected ? 'white' : isOutsideMonth ? '#bdbdbd' : '#1f1f1f'};
  cursor: pointer;
  font-size: 14px;
  position: relative;

  ${({ isToday }) =>
    isToday &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: 4px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #4285f4;
    }
  `}

  &:hover {
    background: ${({ isSelected }) => (isSelected ? '#4285f4' : '#f5f5f5')};
  }

  &:focus {
    outline: 2px solid #4285f4;
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const isSameDay = (date1: Date, date2: Date) =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();

const isToday = (date: Date) => isSameDay(date, new Date());

const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  placeholder = 'Select date',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobileDevice = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  useClickOutside(containerRef, () => setIsOpen(false));

  const NativeInput = styled.input`
    padding: 8px 12px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 14px;
    color: #1f1f1f;
    width: 150px;

    &:hover {
      border-color: #bdbdbd;
    }

    &:focus {
      outline: none;
      border-color: #4285f4;
      box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
    }

    &:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
  `;

  // Handle native date picker for mobile devices
  if (isMobileDevice) {
    return (
      <NativeInput
        type="date"
        value={value ? value.toISOString().split('T')[0] : ''}
        onChange={(e) => {
          const date = new Date(e.target.value);
          onChange?.(date);
        }}
        min={minDate?.toISOString().split('T')[0]}
        max={maxDate?.toISOString().split('T')[0]}
        disabled={disabled}
        className={className}
      />
    );
  }

  const getDaysInMonth = (month: Date) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: Date[] = [];

    // Add days from previous month
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push(new Date(year, monthIndex, -i));
    }

    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, monthIndex, i));
    }

    // Add days from next month
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, monthIndex + 1, i));
    }

    return days;
  };

  const handleDateSelect = (date: Date) => {
    onChange?.(date);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  return (
    <Container ref={containerRef} className={className}>
      <StyledInput
        readOnly
        value={value ? formatDate(value) : ''}
        placeholder={placeholder}
        onClick={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        hasValue={!!value}
      />
      <Calendar open={isOpen}>
        <Header>
          <NavigationButton onClick={handlePrevMonth} type="button">
            ←
          </NavigationButton>
          <MonthYear>
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </MonthYear>
          <NavigationButton onClick={handleNextMonth} type="button">
            →
          </NavigationButton>
        </Header>
        <WeekDays>
          {WEEKDAYS.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </WeekDays>
        <Days>
          {getDaysInMonth(currentMonth).map((date, index) => (
            <Day
              key={index}
              onClick={() => handleDateSelect(date)}
              isSelected={value && isSameDay(date, value)}
              isToday={isToday(date)}
              isOutsideMonth={date.getMonth() !== currentMonth.getMonth()}
              disabled={isDateDisabled(date)}
              type="button"
            >
              {date.getDate()}
            </Day>
          ))}
        </Days>
      </Calendar>
    </Container>
  );
};

export default DatePicker;
