import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useLng } from "../context/LocaleContext";
import { formatAmount } from "../utils/formatAmount";
import { barChartLocales } from "../locale/barChartLocales";

const { width } = Dimensions.get("window");
const CHART_WIDTH = width - 40;

interface BarChartProps {
  data: { category: string; amount: number }[];
  maxAmount: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, maxAmount }) => {
  const { lng, currency } = useLng();
  const t = barChartLocales[lng];

  if (data.length === 0) {
    return (
      <Text style={styles.chartEmptyText}>{t.noExpenses}</Text>
    );
  }

  const maxBarLength = CHART_WIDTH - 120;

  return (
    <View style={styles.chartContainer}>
      {data.map((item, index) => {
        const barLength =
          maxAmount > 0 ? (item.amount / maxAmount) * maxBarLength : 0;

        return (
          <View key={item.category} style={styles.barItem}>
            <Text style={styles.categoryLabel}>
              {item.category}
            </Text>
            <View style={styles.barWrapper}>
              <View
                style={[
                  styles.bar,
                  { width: barLength, backgroundColor: "#F06292" },
                ]}
              />
              <Text style={styles.barAmount}>
                {formatAmount(item.amount, lng, currency, "decimal")}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
  },
  chartEmptyText: {
    textAlign: "center",
    color: "#999",
    paddingVertical: 20,
  },
  barItem: {
    marginBottom: 10,
  },
  categoryLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
    fontWeight: "500",
  },
  barWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  bar: {
    height: 16,
    borderRadius: 4,
    marginRight: 8,
    minWidth: 5,
  },
  barAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});

export default BarChart;
