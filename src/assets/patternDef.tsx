type PatternDefProps = {
  id: string,
  color?: string,
}

export const PatternDef: React.FC<PatternDefProps> = ({id, color}) => {
    return (
        <defs>
          <pattern id={id} patternUnits="userSpaceOnUse" width="3" height="20">
            <rect width="1" height="20" fill={color} />
            <rect x="10" width="5" height="20" fill="transparent" />
          </pattern>
        </defs>
    )
}
