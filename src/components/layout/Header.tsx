import { NavUnderlineSlide } from './nav-variants/NavUnderlineSlide';
import type { NavVariantProps } from './nav-variants/types';

export function Header(props: NavVariantProps) {
  return <NavUnderlineSlide {...props} />;
}
