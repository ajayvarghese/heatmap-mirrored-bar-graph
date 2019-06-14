import React from "react";
import "./HeatMap.css";
import classNames from "classnames";
import PropTypes from "prop-types";

const styles = {
  wrapper: "wrapper",
  map: "map",
  row_wrapper: "row_wrapper",
  row: "row",
  cell: "cell",
  y: "y",
  y_label: "y_label",
  x: "x",
  x_label: "x_label",
  cell_bg: "cell_bg",
  positive: "positive",
  negative: "negative",
  y_axis_label: "y_axis_label",
  x_axis_label: "x_axis_label",
  legend: "legend",
  legend_icon: "legend_icon",
  legend_label: "legend_label"
};

const HeatMap = ({ data }) => {
  const xLabels = Object.keys(data);
  const yLabels = Object.keys(data[xLabels[0]]).reverse();
  const values = Object.values(data).reduce(
    (acc, k) => acc.concat(Object.values(k)),
    []
  );
  const minMax = [Math.min(...values), Math.max(...values)];
  return (
    <div className={styles.wrapper}>
      <label className={styles.y_axis_label}>Features</label>
      <div className={styles.y}>
        {yLabels.map((label, index) => (
          <div key={`YLabel-${label}`} className={styles.y_label} title={label}>
            {label}
          </div>
        ))}
      </div>
      <div className={styles.map}>
        <div className={styles.row_wrapper}>
          {yLabels.map((yLabel, index) => (
            <div key={`CellRow-${yLabel}`} className={styles.row}>
              {xLabels.map((xLabel, index) => {
                const value = Number(data[xLabel][yLabel].toFixed(4));
                const opacity = Math.max(
                  0.1,
                  value * (1 / (value > 0 ? minMax[1] : minMax[0]))
                );
                return (
                  <div key={`Cell-${yLabel}-${xLabel}`} className={styles.cell}>
                    <div
                      className={classNames(
                        styles.cell_bg,
                        value > 0 ? styles.positive : styles.negative
                      )}
                      style={{ opacity }}
                    />
                    {value}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className={styles.x}>
          {xLabels.map((xLabel, index) => (
            <div
              key={`XLabel-${xLabel}`}
              className={styles.x_label}
              title={xLabel}
            >
              {xLabel}
            </div>
          ))}
        </div>
        <label className={styles.x_axis_label}>Case</label>
      </div>
      <div className={styles.legend}>
        <label className={styles.legend_label}>Feature Weight</label>
        <ul>
          {[-0.15, -0.1, -0.05, 0, 0.05, 0.1, 0.15]
            .reverse()
            .map(legendItem => (
              <li>
                <span
                  className={classNames(
                    styles.legend_icon,
                    legendItem > 0 ? styles.positive : styles.negative
                  )}
                  style={{ opacity: Math.abs(legendItem) / 0.15 }}
                />
                {legendItem}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

HeatMap.propTypes = {
  data: PropTypes.instanceOf(Object)
};

HeatMap.defaultProps = {
  data: {}
};

export default HeatMap;
