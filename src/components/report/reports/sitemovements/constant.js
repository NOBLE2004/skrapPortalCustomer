export const smallPieData = (data) => ({
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
    height: 180,
    events: {
      render: function () {
        var series = this.series[0],
          seriesCenter = series.center,
          x = seriesCenter[0] + this.plotLeft,
          y = seriesCenter[1] + this.plotTop,
          text = data?.percentage + "%",
          fontMetrics = this.renderer.fontMetrics(16);
        if (!this.customTitle) {
          this.customTitle = this.renderer
            .text(text, null, null, true)
            .css({
              transform: "translate(-50%)",
              fontSize: "26px",
              color: "#0F2851",
              fontFamily: "DM Sans",
              fontWeight: 700,
            })
            .add();
        }

        this.customTitle.attr({
          x,
          y: y + fontMetrics.f / 2,
        });
      },
    },
  },
  title: {
    text: null,
  },
  subtitle: {
    text: `${
      data?.name?.charAt(0)?.toUpperCase() +
      data?.name?.slice(1)?.toLowerCase()?.replace(/_/g, " ")
    }`,
    y: 80,
    x: 0,
    style: {
      color: "#677790",
      fontFamily: "DM Sans",
      fontWeight: 700,
      fontSize: "12px",
    },
  },
  tooltip: {
    pointFormat: "<b>{point.percentage:.1f}%</b>",
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
  legend: {
    align: "right",
    layout: "vertical",
    size: "20%",
    width: 150,
    verticalAlign: "middle",
    x: 0,
    y: 0,
    padding: 3,
    itemMarginTop: 2,
    itemMarginBottom: 2,
    itemStyle: {
      textOverflow: "ellipsis",
    },
  },
  plotOptions: {
    pie: {
      center: ["30%", "30%"],
      size: [150, 100],
      allowPointSelect: true,
      cursor: "pointer",
      colors:
        data?.data?.length > 0
          ? ["#0f2851", "#4981f8", "#60a0f8", "#a4adbc"]
          : ["#fff"],
      dataLabels: {
        enabled: false,
      },
      showInLegend: true,
    },
  },
  series: [
    {
      minPointSize: 10,
      innerSize: "75%",
      zMin: 0,
      name: "countries",
      data: data?.data?.length > 0 ? data?.data : [{ y: 0, name: "" }],
    },
  ],
});

export const siteMovementData = (data, total) => ({
  chart: {
    reflow: false,
    height: 250,
    type: "pie",
    events: {
      render: function () {
        console.log(data, total)
        var series = this.series[0],
          seriesCenter = series?.center,
          x = seriesCenter[0] + this.plotLeft,
          y = seriesCenter[1] + this.plotTop,
          text = (total == undefined ? 0 : Math.round(total)) + "%",
          fontMetrics = this.renderer.fontMetrics(16);
        if (!this.customTitle) {
          this.customTitle = this.renderer
            .text(text, null, null, true)
            .css({
              transform: "translate(-50%)",
              fontSize: "30px",
              color: "#0F2851",
              fontFamily: "DM Sans",
              fontWeight: 700,
            })
            .add();
        }

        this.customTitle.attr({
          x,
          y: y + fontMetrics.f / 2,
        });
      },
    },
  },

  title: {
    text: null,
  },
  tooltip: {
    pointFormat: "<b>{point.percentage:.1f}%</b>",
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
  legend: {
    align: "right",
    layout: "vertical",
    verticalAlign: "middle",
    x: -100,
    y: 0,
    padding: 3,
    itemMarginTop: 5,
    itemMarginBottom: 5,
    itemStyle: {
      lineHeight: "14px",
    },
  },
  plotOptions: {
    pie: {
      center: ["50%", "50%"],
      size: [210, 100],
      allowPointSelect: true,
      cursor: "pointer",
      colors: ["#0f2851", "#4981f8", "#60a0f8", "#a4adbc"],
      dataLabels: {
        enabled: false,
      },
      showInLegend: true,
    },
  },
  responsive: {
    rules: [
      {
        condition: {
          minWidth: 300,
        },
      },
    ],
  },
  series: [
    {
      minPointSize: 10,
      innerSize: "75%",
      zMin: 0,
      data: data,
    },
  ],
});
