import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieLabelRenderProps 
} from 'recharts'
import { PopulationItem } from '../domain/PopulationItem'

type Props = {
  data: PopulationItem[]
}

const LineDataChart: React.FC<Props> = ({ data }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getOuterRadius = () => {
    if (windowWidth > 2560) return 250; // desktop
    if (windowWidth > 1920) return 200; // desktop
    if (windowWidth > 1441) return 150; // desktop
    if (windowWidth > 1280) return 100; // desktop
    if (windowWidth > 1024) return 150; // desktop
    if (windowWidth > 640) return 150;   // tablet
    return 150;                          // mobile
  };

  const getHeight = () => {
    if (windowWidth > 2560) return 600; // desktop
    if (windowWidth > 1920) return 550; // desktop
    if (windowWidth > 1441) return 500; // desktop
    if (windowWidth > 1280) return 400; // desktop
    if (windowWidth > 1024) return 400; // desktop
    if (windowWidth > 640) return 400;   // tablet
    return 400;                          // mobile
  };

  //create soft color
  const hues = Array.from({ length: data.length }, (_, i) => Math.floor(i * (360 / data.length)));

  for (let i = hues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [hues[i], hues[j]] = [hues[j], hues[i]];
  }

  const randomColors = hues.map(hue => {
    const saturation = Math.floor(Math.random() * 20) + 60; // 60–80%
    const lightness = Math.floor(Math.random() * 10) + 60;  // 60–70%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  });
  //end create soft color

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: PieLabelRenderProps) => {
    const RADIAN = Math.PI / 180;
    const radius = +innerRadius! + (+outerRadius! - +innerRadius!) * 0.5;
    const x = +cx! + radius * Math.cos(-midAngle * RADIAN);
    const y = +cy! + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={13}
        fontWeight={600}
      >
        {(percent! * 100).toFixed(1)}%
      </text>
    );
  };

  return (
    <>
      <h4 className="font-bold mb-2">Data di Pie Chart</h4>
      <ResponsiveContainer width={"100%"} height={getHeight()}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={windowWidth > 768 ? "40%" : "50%"}
            cy="50%"
            outerRadius={getOuterRadius()}
            fill="#8884d8"
            nameKey="Year"
            dataKey="Population"
            label={renderCustomizedLabel}
            labelLine={false}
            style={{ outline: 'none' }}
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={randomColors[index]} 
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => `${value.toLocaleString()} Population`} 
          />
          <Legend 
            width={windowWidth > 768 ? 150 : 0}
            verticalAlign={windowWidth > 768 ? "middle" : "bottom"}
            align={windowWidth > 768 ? "right" : "center"}
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}

export default LineDataChart