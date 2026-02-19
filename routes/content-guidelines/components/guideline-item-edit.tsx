/**
 * WordPress dependencies
 */
import {
	Button,
	Navigator,
	TextareaControl,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
	useNavigator,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import { chevronLeft } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './guideline-item-edit.scss';

interface GuidelineItemEditProps {
	title: string;
	description: string;
	onSave?: ( content: string ) => void;
}

export default function GuidelineItemEdit( {
	title,
	description,
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
	const navigator = useNavigator();

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
						<Navigator.BackButton
							onClick={ () => navigator.goBack() }
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
