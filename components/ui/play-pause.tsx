import type { SVGProps } from "react";

export function PlayIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M8 5.14v13.72a1 1 0 0 0 1.52.86l10.3-6.86a1.03 1.03 0 0 0 0-1.72L9.52 4.28A1 1 0 0 0 8 5.14Z" fill="currentColor" />
		</svg>
	);
}

export function PauseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M7 5a2 2 0 0 1 2 2v10a2 2 0 1 1-4 0V7a2 2 0 0 1 2-2Zm10 0a2 2 0 0 1 2 2v10a2 2 0 1 1-4 0V7a2 2 0 0 1 2-2Z" fill="currentColor" />
		</svg>
	);
}
