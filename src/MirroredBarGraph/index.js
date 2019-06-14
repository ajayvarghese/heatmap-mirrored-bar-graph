import React from "react";
import "./MirroredBarGraph.css";
import classNames from "classnames";
import PropTypes from "prop-types";

const styles = {
  mb_wrapper: "mb_wrapper",
  graph: "graph",
  plot_area: "plot_area",
  grid: "grid",
  bar_group: "bar_group",
  bar: "bar",
  negative_wrapper: "negative_wrapper",
  positive_wrapper: "positive_wrapper",
  positive: "positive",
  negative: "negative",
  grid_wrapper: "grid_wrapper",
  axis_label: "axis_label",
  y: "y",
  y_label: "y_label",
  zero: "zero"
};

const roundTo = (no, digit) => Number(no.toFixed(digit));

const MirroredBarGraph = ({ data, label }) => {
  const keys = Object.keys(data);
  const values = Object.values(data).map(i => roundTo(i, 3));
  const minMax = [Math.min(...values), Math.max(...values)];
  const rangeLimit = Math.abs(minMax[0]) + Math.abs(minMax[1]);
  const division = roundTo(rangeLimit) / 6;
  console.log("DIV", division);
  const yValues = [
    ...Array.from({ length: Math.ceil(Math.abs(minMax[0] / division)) })
      .map((_, index) => -(index + 1) * division)
      .reverse(),
    ...Array.from({ length: Math.ceil(Math.abs(minMax[1] / division)) }).map(
      (_, index) => (index + 1) * division
    )
  ].map(i => roundTo(i, 3));

  console.log(yValues);

  const containerWidth =
    (yValues.findIndex((v, i) => v > 0 && yValues[Math.max(i - 1, 0) + 1] > 0) *
      100) /
    yValues.length;
  return (
    <div className={styles.mb_wrapper}>
      <div className={styles.graph}>
        <div className={styles.y}>
          {keys.map(k => (
            <div className={styles.y_label}>{k}</div>
          ))}
        </div>
        <div className={styles.plot_area}>
          <div className={styles.bar_group}>
            <div className={styles.grid_wrapper}>
              {yValues.map(i => (
                <div
                  className={styles.grid}
                  style={i > 0 ? { "text-align": "right" } : {}}
                >
                  <span
                    className={styles.axis_label}
                    style={i > 0 ? { transform: "translateX(-50%)" } : {}}
                  >
                    {i}
                  </span>
                </div>
              ))}
            </div>
            <div
              className={styles.negative_wrapper}
              style={{ width: containerWidth + "%" }}
            >
              {values.map(i => {
                return (
                  <div
                    className={classNames(styles.bar, styles.negative)}
                    style={{
                      width: (i < 0 ? (i * 100) / yValues[0] : 0) + "%"
                    }}
                  />
                );
              })}
            </div>
            <div className={styles.positive_wrapper}>
              <div className={classNames(styles.y_label, styles.zero)}>0</div>
              {values.map(i => {
                return (
                  <div
                    className={classNames(styles.bar, styles.positive)}
                    style={{
                      width:
                        (i > 0 ? (i * 100) / yValues[yValues.length - 1] : 0) +
                        "%"
                    }}
                  />
                );
              })}
            </div>
          </div>
          {/* {yValues.map(i => (
          <div className={styles.grid}>{i}</div>
        ))} */}
        </div>
      </div>
      <div>{label}</div>
    </div>
  );
};

MirroredBarGraph.propTypes = {
  data: PropTypes.instanceOf(Object),
  label: PropTypes.string
};

MirroredBarGraph.defaultProps = {
  data: {},
  label: ""
};

export default MirroredBarGraph;
