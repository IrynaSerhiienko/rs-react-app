import { DEFAULT_SVG_COLOR } from '../../data/app-data';

type SvgProps = React.SVGProps<SVGSVGElement> & {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color?: string;
  label?: string;
};

export function SvgWrapper({
  icon: Icon,
  color = DEFAULT_SVG_COLOR,
  label,
  ...props
}: SvgProps) {
  return <Icon {...props} fill={color} role="img" aria-label={label} />;
}
