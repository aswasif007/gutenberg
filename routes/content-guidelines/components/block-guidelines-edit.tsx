/**
 * WordPress dependencies
 */
import {
	Button,
	Navigator,
	SelectControl,
	TextareaControl,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
	useNavigator,
} from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import { chevronLeft } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { STORE_NAME } from '../store';
import './block-guidelines-edit.scss';
import { useBlockTypes } from '../use-block-types';

export default function BlockGuidelinesEdit() {
	const navigator = useNavigator();
	const blockParam = navigator.params.block;
	const blockName = blockParam
		? decodeURIComponent( blockParam as unknown as string )
		: '';

	const [ selectedBlock, setSelectedBlock ] = useState( blockName );
	const [ guidelines, setGuidelines ] = useState( '' );
	const { blockTypes, loading, blockGuidelines } = useBlockTypes();

	const { setBlockGuidelines, removeBlockGuidelines } =
		useDispatch( STORE_NAME );

	const baseId = useInstanceId(
		BlockGuidelinesEdit,
		'content-guidelines__block-guidelines-edit'
	);
	const headingId = `${ baseId }-heading`;
	const descriptionId = `${ baseId }-description`;
	const formId = `${ baseId }-form`;

	const handleSubmit = ( e: { preventDefault: () => void } ) => {
		setBlockGuidelines( selectedBlock, guidelines );
		e.preventDefault();
	};

	const handleDeleteGuidelines = () => {
		removeBlockGuidelines( selectedBlock );
	};

	const storedGuidelinesForBlock = blockGuidelines[ selectedBlock ] ?? '';

	useEffect( () => {
		setGuidelines( storedGuidelinesForBlock );
	}, [ storedGuidelinesForBlock ] );

	if ( loading ) {
		return (
			<div className="content-guidelines__block-guidelines-edit">
				{ __( 'Loading block guidelines…' ) }
			</div>
		);
	}

	const isEditing = selectedBlock && storedGuidelinesForBlock;

	return (
		<div className="content-guidelines__block-guidelines-edit">
			<form
				id={ formId }
				onSubmit={ handleSubmit }
				aria-labelledby={ headingId }
				aria-describedby={ descriptionId }
			>
				<VStack spacing={ 4 }>
					<HStack spacing={ 1 } alignment="left">
						<Navigator.BackButton
							onClick={ () =>
								navigator.goTo( '/guideline/blocks' )
							}
							icon={ chevronLeft }
							aria-label={ __(
								'Go back to content guidelines list'
							) }
							size="small"
						/>
						<h2
							id={ headingId }
							className="content-guidelines__block-guidelines-edit-title"
						>
							{ isEditing
								? __( 'Edit block guidelines' )
								: __( 'Add block guidelines' ) }
						</h2>
					</HStack>
					<p
						id={ descriptionId }
						className="content-guidelines__block-guidelines-edit-description"
					>
						{ __(
							'Create tailored guidelines for specific block types (headings, images, quotes, etc.). This allows you to set unique standards for how different blocks are treated.'
						) }
					</p>
					<SelectControl
						label={ __( 'Block' ) }
						value={ selectedBlock }
						options={ [
							{
								label: __( 'Select a block' ),
								value: '',
							},
							...blockTypes,
						] }
						onChange={ setSelectedBlock }
						className="content-guidelines__block-guidelines-edit-select"
						__nextHasNoMarginBottom
					/>
					<TextareaControl
						className="content-guidelines__block-guidelines-edit-textarea"
						label={ __( 'Guidelines' ) }
						value={ guidelines }
						onChange={ setGuidelines }
						rows={ 6 }
						placeholder={ __(
							'Enter your block-specific guidelines here…'
						) }
						__nextHasNoMarginBottom
					/>
					<HStack justify="flex-start" spacing={ 2 }>
						<Button
							type="submit"
							variant="primary"
							disabled={
								! selectedBlock ||
								guidelines === storedGuidelinesForBlock
							}
						>
							{ __( 'Add guidelines' ) }
						</Button>
						{ isEditing && (
							<Button
								type="button"
								variant="secondary"
								onClick={ handleDeleteGuidelines }
							>
								{ __( 'Delete guidelines' ) }
							</Button>
						) }
					</HStack>
				</VStack>
			</form>
		</div>
	);
}
