/**
 * WordPress dependencies
 */
import { Page } from '@wordpress/admin-ui';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
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
import GuidelineItemEdit from './components/guideline-item-edit';

const GUIDELINE_ITEMS = [
	{
		icon: layout,
		title: __( 'Site' ),
		description: __(
			"Describe your site's purpose, goals, and primary audience."
		),
		descriptionLong: __(
			"Describe your site's purpose, goals, and primary audience. This helps creators develop content that resonates with your readers."
		),
		slug: 'site',
	},
	{
		icon: termDescription,
		title: __( 'Copy' ),
		description: __(
			'Set your writing standards for tone, voice, style, and formatting.'
		),
		descriptionLong: __(
			'Set your writing standards for tone, voice, style, and formatting. Include brand terminology and content to avoid so all writing stays consistent.'
		),
		slug: 'copy',
	},
	{
		icon: image,
		title: __( 'Images' ),
		description: __(
			'Outline your style, dimensions, formats, mood and aesthetic preferences.'
		),
		descriptionLong: __(
			'Outline your style, subject matter, technical requirements (dimensions, formats), mood and aesthetic preferences, and images to avoid. This ensures consistent, accessible imagery.'
		),
		slug: 'images',
	},
	{
		icon: formatListBullets,
		title: __( 'Additional guidelines' ),
		description: __(
			'Include any additional standards such as SEO preferences, legal requirements, citation styles, or other content considerations.'
		),
		descriptionLong: __(
			'Include any additional standards such as SEO preferences, legal requirements, citation styles, or other content considerations.'
		),
		slug: 'additional-guidelines',
	},
];

function ContentGuidelinesPage() {
	const [ selectedGuideline, setSelectedGuideline ] = useState<
		string | null
	>( null );

	const handleSelectGuideline = ( guideline: string ) => {
		setSelectedGuideline( guideline );
	};

	return (
		<Page
			title={ __( 'Content guidelines' ) }
			subTitle={ __(
				"Set content standards that guide your team, inform plugins, and help AI tools generate content that matches your site's voice and requirements."
			) }
		>
			{ selectedGuideline ? (
				<GuidelineItemEdit
					title={
						GUIDELINE_ITEMS.find(
							( item ) => item.slug === selectedGuideline
						)?.title || ''
					}
					description={
						GUIDELINE_ITEMS.find(
							( item ) => item.slug === selectedGuideline
						)?.descriptionLong || ''
					}
					onBack={ () => setSelectedGuideline( null ) }
				/>
			) : (
				<div className="content-guidelines__content">
					{ /*
					 * Disable reason: The `list` ARIA role is redundant but
					 * Safari+VoiceOver won't announce the list otherwise.
					 */
					/* eslint-disable jsx-a11y/no-redundant-roles */ }
					<ul role="list" className="content-guidelines__list">
						{ GUIDELINE_ITEMS.map( ( item ) => (
							<li
								key={ item.slug }
								className="content-guidelines__list-item"
							>
								<GuidelineItemCard
									icon={ item.icon }
									title={ item.title }
									description={ item.description }
									onClick={ () =>
										handleSelectGuideline( item.slug )
									}
								/>
							</li>
						) ) }
					</ul>
					{ /* eslint-enable jsx-a11y/no-redundant-roles */ }
				</div>
			) }
		</Page>
	);
}

export const stage = ContentGuidelinesPage;
