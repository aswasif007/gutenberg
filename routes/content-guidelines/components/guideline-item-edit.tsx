/**
 * WordPress dependencies
 */
import {
	Button,
	TextareaControl,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { chevronLeft } from '@wordpress/icons';
import { useInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import './guideline-item-edit.scss';

interface GuidelineItemEditProps {
	title: string;
	description: string;
	onBack: () => void;
	onSave?: ( content: string ) => void;
}

export default function GuidelineItemEdit( {
	title,
	description,
	onBack,
	onSave,
}: GuidelineItemEditProps ) {
	const [ content, setContent ] = useState( '' );
	const baseId = useInstanceId(
		GuidelineItemEdit,
		'content-guidelines__item-edit'
	);
	const headingId = `${ baseId }-heading`;
	const descriptionId = `${ baseId }-description`;
	const formId = `${ baseId }-form`;

	const handleSubmit = ( e: { preventDefault: () => void } ) => {
		e.preventDefault();
		onSave?.( content );
	};

	return (
		<div className="content-guidelines__item-edit">
			<form
				id={ formId }
				onSubmit={ handleSubmit }
				aria-labelledby={ headingId }
				aria-describedby={ description ? descriptionId : undefined }
			>
				<VStack spacing={ 4 }>
					<HStack spacing={ 1 } alignment="left">
						<Button
							type="button"
							onClick={ onBack }
							icon={ chevronLeft }
							aria-label={ __(
								'Go back to content guidelines list'
							) }
							size="small"
						/>
						<h2
							id={ headingId }
							className="content-guidelines__item-edit-title"
						>
							{ title }
						</h2>
					</HStack>
					{ description && (
						<p
							id={ descriptionId }
							className="content-guidelines__item-edit-description"
						>
							{ description }
						</p>
					) }
					<TextareaControl
						className="content-guidelines__item-edit-textarea"
						label={ __( 'Guidelines' ) }
						value={ content }
						onChange={ setContent }
						rows={ 6 }
						placeholder={ __(
							'Enter your content guidelines here…'
						) }
						help={
							description
								? undefined
								: __(
										'Enter the content guidelines for this section.'
								  )
						}
					/>
					<HStack justify="flex-start" spacing={ 2 }>
						<Button type="submit" variant="primary">
							{ __( 'Save guidelines' ) }
						</Button>
					</HStack>
				</VStack>
			</form>
		</div>
	);
}
