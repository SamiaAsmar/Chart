'use client'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart'
import { Checkbox, FormControlLabel, Stack, Typography, Box } from '@mui/material'
import { useState, useMemo } from 'react'
import { ColorsUtils } from '@/@core/utils/ColorsUtils'
import { pieLabels as labels, pieValues as values, pieColors as colors } from '@/@core/data/pieChartData'

function PieChartCard() {
  const [hideLegend, setHideLegend] = useState(false)
  const [hideLabels, setHideLabels] = useState(false)
  const [showPaddingAngle, setShowPaddingAngle] = useState(false)
  const [disableInteraction, setDisableInteraction] = useState(false)
  const [hiddenIndices, setHiddenIndices] = useState(new Set())

  const wrapperWidth = 500
  const total = values.reduce((acc, val) => acc + val, 0)

  const pieData = useMemo(
    () =>
      labels
        .map((label, i) => ({
          id: i,
          value: values[i],
          label,
          color: colors[i % colors.length]
        }))
        .filter((_, i) => !hiddenIndices.has(i)),
    [hiddenIndices]
  )

  return (
    <Stack gap={2} alignItems='center' sx={{ width: '100%', maxWidth: 800, margin: '0 auto', p: 2 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        Pie Chart Customization Options
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
          p: 2,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 1
        }}
      >
        <FormControlLabel
          control={<Checkbox checked={hideLegend} onChange={e => setHideLegend(e.target.checked)} />}
          label='Hide Legend'
        />
        <FormControlLabel
          control={<Checkbox checked={hideLabels} onChange={e => setHideLabels(e.target.checked)} />}
          label='Hide Labels'
        />
        <FormControlLabel
          control={<Checkbox checked={showPaddingAngle} onChange={e => setShowPaddingAngle(e.target.checked)} />}
          label='Add Padding'
        />
        <FormControlLabel
          control={<Checkbox checked={disableInteraction} onChange={e => setDisableInteraction(e.target.checked)} />}
          label='Disable Hover'
        />
      </Box>
      <PieChart
        series={[
          {
            data: pieData,
            highlightScope: disableInteraction
              ? { fade: 'none', highlight: 'none' }
              : { fade: 'global', highlight: 'item' },
            arcLabel: hideLabels
              ? undefined
              : item => {
                  const percentage = (item.value / total) * 100
                  return percentage >= 8 ? `${percentage.toFixed(2)}%` : ''
                },
            arcLabelMinAngle: 35,
            valueFormatter: item => {
              const percentage = ((item.value / total) * 100).toFixed(2)
              return `${percentage}% (${item.value})`
            },
            paddingAngle: showPaddingAngle ? 2 : 0,
            cornerRadius: showPaddingAngle ? 5 : 0,
            cx: '50%',
            cy: '50%'
          }
        ]}
        width={500}
        height={400}
        slotProps={{
          legend: {
            position: {
              vertical: 'bottom',
              horizontal: 'center'
            },
            toggleVisibilityOnClick: true,
            onItemClick: (event, item) => {
              console.log(item)
            }
          }
        }}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontSize: wrapperWidth < 300 ? 12 : 16,
            fontFamily: 'Montserrat',
            fontWeight: 400
          },
          ...Object.fromEntries(
            pieData.map((item, index) => [
              `& text.${pieArcLabelClasses.root}:nth-of-type(${index + 1})`,
              { fill: `#${ColorsUtils.getContrastColor(item.color)}` }
            ])
          ),
          '& .MuiChartsLegend-root': {
            display: hideLegend ? 'none' : 'flex'
          },
          '& .MuiPieArc-root': {
            cursor: disableInteraction ? 'default' : 'pointer',
            pointerEvents: disableInteraction ? 'none' : 'auto'
          },
          '& .MuiPieArc-root:hover': {
            opacity: disableInteraction ? 1 : 0.9
          },
          '& .MuiChartsLegend-root *': {
            fontWeight: 700
          }
        }}
        margin={{ top: 50, right: 50, bottom: 100, left: 50 }}
      />
    </Stack>
  )
}

export default PieChartCard
