// Month navigation and date grid; selection and task grouping stay in CalendarScreen.
import styles from "./CalendarScreen.styles";

import { View, Text, TouchableOpacity } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useTheme } from "../../context/ThemeContext";

export function CalendarMonthView({
  currentMonthName,
  safeTasks,
  handleToday,
  handlePrevMonth,
  handleNextMonth,
  navigation,
  extractDateKey,
  selectedDate,
  calendarRows,
  isTodayDate,
  isSelectedDayDate,
  handleSelectCell,
  getPriorityDot,
}) {
  const { colors } = useTheme();
  return (
    <>
      <View
        style={[
          styles.sectionHeader,
          { borderBottomColor: colors.outlineVariant },
        ]}
      >
        <View>
          <View style={styles.headerTagRow}>
            <View
              style={[styles.headerTagDot, { backgroundColor: colors.primary }]}
            />
            <Text
              style={[styles.headerTagText, { color: colors.onSurfaceVariant }]}
            >
              WORKSPACE CALENDAR · SCHEDULE
            </Text>
          </View>
          <Text style={[styles.monthTitle, { color: colors.onSurface }]}>
            {currentMonthName.toUpperCase()}
          </Text>
          <Text
            style={[styles.monthSubtitle, { color: colors.onSurfaceVariant }]}
          >
            {safeTasks.length} tasks scheduled in this calendar view.
          </Text>
        </View>

        {/* Month Actions Bar */}
        <View style={styles.actionControlsRow}>
          <TouchableOpacity
            onPress={handleToday}
            style={[
              styles.todayBtn,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <Text style={[styles.todayBtnText, { color: colors.onSurface }]}>
              TODAY
            </Text>
          </TouchableOpacity>

          <View
            style={[
              styles.arrowsBox,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <TouchableOpacity
              onPress={handlePrevMonth}
              style={[
                styles.arrowBtn,
                {
                  borderRightColor: colors.outlineVariant,
                  borderRightWidth: 1,
                },
              ]}
            >
              <MaterialIcons
                name="chevron-left"
                size={20}
                color={colors.onSurface}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextMonth} style={styles.arrowBtn}>
              <MaterialIcons
                name="chevron-right"
                size={20}
                color={colors.onSurface}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CreateTask", {
                dueDate: extractDateKey(selectedDate),
              })
            }
            style={[styles.scheduleBtn, { backgroundColor: colors.primary }]}
            activeOpacity={0.85}
          >
            <MaterialIcons name="add" size={16} color={colors.onPrimary} />
            <Text style={[styles.scheduleBtnText, { color: colors.onPrimary }]}>
              SCHEDULE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          styles.calendarCard,
          {
            backgroundColor: colors.surfaceContainerLowest,
            borderColor: colors.outlineVariant,
          },
        ]}
      >
        {/* Weekday Names Header - 7 equal columns */}
        <View
          style={[
            styles.weekdaysRow,
            {
              backgroundColor: colors.surfaceContainerLow,
              borderBottomColor: colors.outlineVariant,
            },
          ]}
        >
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day, idx) => (
            <View
              key={day}
              style={[
                styles.weekdayCell,
                idx < 6 && {
                  borderRightWidth: 1,
                  borderRightColor: colors.outlineVariant,
                },
              ]}
            >
              <Text
                style={[
                  styles.weekdayText,
                  {
                    color: idx >= 5 ? colors.outline : colors.onSurface,
                  },
                ]}
              >
                {day}
              </Text>
            </View>
          ))}
        </View>

        {/* Days Grid - Row-based, strict 7 columns */}
        <View style={styles.daysGrid}>
          {calendarRows.map((row, rowIdx) => (
            <View
              key={`row-${rowIdx}`}
              style={[
                styles.calendarRow,
                { borderBottomColor: colors.outlineVariant },
                rowIdx === calendarRows.length - 1 && {
                  borderBottomWidth: 0,
                },
              ]}
            >
              {row.map((cell, colIdx) => {
                const isCurrentToday = isTodayDate(cell.dateObj);
                const isSelected = isSelectedDayDate(cell.dateObj);

                return (
                  <TouchableOpacity
                    key={cell.dateKey}
                    onPress={() => handleSelectCell(cell)}
                    style={[
                      styles.dayCell,
                      colIdx < 6 && {
                        borderRightWidth: 1,
                        borderRightColor: colors.outlineVariant,
                      },
                      {
                        backgroundColor: isSelected
                          ? colors.surfaceContainerHigh
                          : cell.isCurrentMonth
                            ? colors.surfaceContainerLowest
                            : colors.surfaceContainerLow + "50",
                      },
                      isSelected && {
                        borderWidth: 1.5,
                        borderColor: colors.primary,
                      },
                    ]}
                    activeOpacity={0.7}
                  >
                    <View style={styles.dayCellTop}>
                      <View
                        style={[
                          styles.dayNumberCircle,
                          isCurrentToday && {
                            backgroundColor: colors.primary,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.dayNumberText,
                            {
                              color: isCurrentToday
                                ? colors.onPrimary
                                : isSelected
                                  ? colors.primary
                                  : cell.isCurrentMonth
                                    ? colors.onSurface
                                    : colors.outline,
                              fontWeight:
                                isCurrentToday || isSelected ? "bold" : "500",
                            },
                          ]}
                        >
                          {cell.dayNumber}
                        </Text>
                      </View>

                      {cell.tasks.length > 0 ? (
                        <View
                          style={[
                            styles.taskCountBadge,
                            {
                              backgroundColor: isSelected
                                ? colors.primaryContainer
                                : colors.surfaceContainer,
                              borderColor: colors.outlineVariant,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.taskCountText,
                              {
                                color: isSelected
                                  ? colors.primary
                                  : colors.onSurfaceVariant,
                              },
                            ]}
                          >
                            {cell.tasks.length}
                          </Text>
                        </View>
                      ) : null}
                    </View>

                    {/* Task Dots */}
                    <View style={styles.taskDotsRow}>
                      {cell.tasks.slice(0, 3).map((t, tIdx) => (
                        <View
                          key={tIdx}
                          style={[
                            styles.taskMiniDot,
                            {
                              backgroundColor: getPriorityDot(t.priority),
                            },
                          ]}
                        />
                      ))}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </>
  );
}
