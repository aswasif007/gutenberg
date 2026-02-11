/**
 * WordPress dependencies
 */
import { Page } from '@wordpress/admin-ui';
import { __ } from '@wordpress/i18n';

function ContentGuidelinesPage() {
	return <Page title={ __( 'Content Guidelines' ) }>{ null }</Page>;
}

export const stage = ContentGuidelinesPage;
