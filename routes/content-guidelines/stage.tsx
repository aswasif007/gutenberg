/**
 * WordPress dependencies
 */
import { Page } from '@wordpress/admin-ui';
import { __ } from '@wordpress/i18n';
import {
	blockDefault,
	image,
	layout,
	formatListBullets,
	termDescription,
} from '@wordpress/icons';

/**
 * Internal dependencies
 */
import GuidelineItemCard from './components/guideline-item-card';
import './style.scss';

const GUIDELINE_ITEMS = [
	{
		icon: layout,
		title: __( 'Site' ),
		description: __(
			"Describe your site's purpose, goals, and primary audience."
		),
	},
	{
		icon: termDescription,
		title: __( 'Copy' ),
		description: __(
			'Set your writing standards for tone, voice, style, and formatting.'
		),
	},
	{
		icon: image,
		title: __( 'Images' ),
		description: __(
			'Outline your style, dimensions, formats, mood and aesthetic preferences.'
		),
	},
	{
		icon: blockDefault,
		title: __( 'Blocks' ),
		description: __(
			'Create tailored guidelines for specific block types.'
		),
	},
	{
		icon: formatListBullets,
		title: __( 'Additional guidelines' ),
		description: __(
			'Include any additional standards such as SEO preferences, legal requirements, citation styles, or other content considerations.'
		),
	},
];

function ContentGuidelinesPage() {
	return (
		<Page
			title={ __( 'Content guidelines' ) }
			subTitle={ __(
				"Set content standards that guide your team, inform plugins, and help AI tools generate content that matches your site's voice and requirements."
			) }
		>
			<div className="content-guidelines__content">
				<div className="content-guidelines__list">
					{ GUIDELINE_ITEMS.map( ( item ) => (
						<GuidelineItemCard
							key={ item.title }
							icon={ item.icon }
							title={ item.title }
							description={ item.description }
						/>
					) ) }
				</div>
			</div>
		</Page>
	);
}

export const stage = ContentGuidelinesPage;
