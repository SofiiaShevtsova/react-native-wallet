import { Fragment, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Polyline, Circle, Line } from "react-native-svg";
import { MONTH_NAMES_UA } from "../constants/constants";

interface LineChartProps {
  incomeData: number[];
  expenseData: number[];
  maxAmount: number;
}

const LineChart = ({ incomeData, expenseData, maxAmount }: LineChartProps) => {
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    value: number;
    color: string;
  } | null>(null);

  if (maxAmount === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>
          Недостатньо даних для побудови графіка за цей рік.
        </Text>
      </View>
    );
  }

  const CHART_HEIGHT = 200;
  const CHART_WIDTH = 320;
  const PADDING = 5;
  const stepX = (CHART_WIDTH - PADDING * 2) / (incomeData.length - 1);

  const getY = (value: number) => {
    if (value === 0) return CHART_HEIGHT;
    return CHART_HEIGHT - (value / maxAmount) * CHART_HEIGHT;
  };

  const incomePoints = incomeData
    .map((v, i) => `${PADDING + i * stepX},${getY(v)}`)
    .join(" ");

  const expensePoints = expenseData
    .map((v, i) => `${PADDING + i * stepX},${getY(v)}`)
    .join(" ");

  const yLabels = [
    maxAmount,
    maxAmount * 0.75,
    maxAmount * 0.5,
    maxAmount * 0.25,
    0,
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.yLabelsContainer}>
        {yLabels.map((val, index) => (
          <Text key={index} style={styles.yLabel}>
            {Math.round(val).toLocaleString("uk-UA")}
          </Text>
        ))}
      </View>

      <Svg height={CHART_HEIGHT} width={CHART_WIDTH}>
        <Line
          x1={PADDING}
          y1={0}
          x2={PADDING}
          y2={CHART_HEIGHT}
          stroke="#ccc"
          strokeWidth="1"
        />

        {yLabels.map((_, i) => (
          <Line
            key={i}
            x1={PADDING}
            y1={(CHART_HEIGHT / 4) * i}
            x2={CHART_WIDTH - 5}
            y2={(CHART_HEIGHT / 4) * i}
            stroke="#eee"
            strokeWidth="1"
          />
        ))}

        <Line
          x1={PADDING}
          y1={CHART_HEIGHT}
          x2={CHART_WIDTH - 5}
          y2={CHART_HEIGHT}
          stroke="#ccc"
          strokeWidth="1"
        />

        <Polyline
          points={expensePoints}
          stroke="#D32F2F"
          strokeWidth="2"
          fill="none"
        />

        <Polyline
          points={incomePoints}
          stroke="#388E3C"
          strokeWidth="2"
          fill="none"
        />

        {incomeData.map((v, i) => {
          const cx = PADDING + i * stepX;
          const cy = getY(v);

          return (
            <Fragment key={"inc-" + i}>
              <Circle
                cx={cx}
                cy={cy}
                r="6"
                fill="transparent"
                onPress={() =>
                  setTooltip({
                    x: cx,
                    y: cy,
                    value: v,
                    color: "#388E3C",
                  })
                }
              />
              <Circle cx={cx} cy={cy} r="4" fill="#388E3C" />
            </Fragment>
          );
        })}

        {expenseData.map((v, i) => {
          const cx = PADDING + i * stepX;
          const cy = getY(v);

          return (
            <Fragment key={"exp-" + i}>
              <Circle
                cx={cx}
                cy={cy}
                r="6"
                fill="transparent"
                onPress={() =>
                  setTooltip({
                    x: cx,
                    y: cy,
                    value: v,
                    color: "#D32F2F",
                  })
                }
              />
              <Circle cx={cx} cy={cy} r="4" fill="#D32F2F" />
            </Fragment>
          );
        })}
      </Svg>

      {tooltip && (
        <View
          style={[
            styles.tooltip,
            { left: tooltip.x + 15, top: tooltip.y - 10 },
          ]}
        >
          <Text style={[styles.tooltipText, { color: tooltip.color }]}>
            {tooltip.value.toLocaleString("uk-UA")}
          </Text>
        </View>
      )}

      <View style={styles.xLabelsContainer}>
        {MONTH_NAMES_UA.map((m, index) => (
          <View key={index} style={styles.xLabelWrapper}>
            <Text style={styles.xLabel}>{m.slice(0, 3)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    marginTop: 10,
  },
  yLabelsContainer: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 2,
  },
  yLabel: {
    fontSize: 10,
    color: "#666",
    height: 20,
  },
  xLabelsContainer: {
    position: "absolute",
    left: 18,
    top: 210,
    width: 320 - 40 * 2,
    padding: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  xLabelWrapper: {
    height: 20,
    justifyContent: "flex-start",
  },
  xLabel: {
    fontSize: 9,
    color: "#444",
    textAlign: "center",
    transform: [{ rotate: "-90deg" }],
    width: 28,
  },
  noDataContainer: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    color: "#888",
    fontSize: 14,
  },
  tooltip: {
    position: "absolute",
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 4,
  },
  tooltipText: {
    fontSize: 11,
    fontWeight: "600",
  },
});

export default LineChart;
