/**
 * WordPress dependencies
 */
import {
	accordion,
	accordionHeading,
	accordionItem,
	archive,
	audio,
	blockTable,
	button,
	buttons,
	calendar,
	category,
	code,
	column,
	columns,
	comment,
	commentAuthorAvatar,
	commentAuthorName,
	commentContent,
	commentEditLink,
	commentReplyLink,
	contents,
	cover,
	customLink,
	details,
	file,
	formatListNumbered,
	gallery,
	group,
	heading,
	home,
	html,
	image,
	layout,
	link,
	list,
	listItem,
	login,
	loop,
	mapMarker,
	math,
	media,
	mediaAndText,
	more,
	navigation,
	page,
	pageBreak,
	pages,
	paragraph,
	postAuthor,
	postCategories,
	postComments,
	postCommentsCount,
	postCommentsForm,
	postContent,
	postDate,
	postExcerpt,
	postFeaturedImage,
	postList,
	preformatted,
	pullquote,
	queryPagination,
	queryPaginationNext,
	queryPaginationNumbers,
	queryPaginationPrevious,
	quote,
	resizeCornerNE,
	rss,
	search,
	separator,
	share,
	shortcode,
	siteLogo,
	symbol,
	tab,
	tableOfContents,
	tabs,
	tabsMenu,
	tabsMenuItem,
	tag,
	termCount,
	termDescription,
	termName,
	timeToRead,
	title,
	verse,
	video,
} from '@wordpress/icons';

export const blockIconMap: Record< string, JSX.Element > = {
	// Common blocks
	'core/paragraph': paragraph,
	'core/image': image,
	'core/heading': heading,
	'core/gallery': gallery,
	'core/list': list,
	'core/list-item': listItem,
	'core/quote': quote,

	// Formatting blocks
	'core/code': code,
	'core/preformatted': preformatted,
	'core/pullquote': pullquote,
	'core/verse': verse,
	'core/footnotes': formatListNumbered,

	// Layout blocks
	'core/buttons': buttons,
	'core/button': button,
	'core/columns': columns,
	'core/column': column,
	'core/group': group,
	'core/cover': cover,
	'core/media-text': mediaAndText,
	'core/spacer': resizeCornerNE,
	'core/separator': separator,
	'core/text-columns': columns, // Deprecated block

	// Widget blocks
	'core/archives': archive,
	'core/calendar': calendar,
	'core/categories': category,
	'core/latest-comments': comment,
	'core/latest-posts': postList,
	'core/rss': rss,
	'core/search': search,
	'core/social-links': share,
	'core/social-link': share,
	'core/tag-cloud': tag,

	// Embed blocks
	'core/embed': media, // Using media as fallback for embed
	'core/audio': audio,
	'core/video': video,
	'core/file': file,

	// Reusable blocks
	'core/block': symbol, // Reusable block

	// More blocks
	'core/more': more,
	'core/nextpage': pageBreak,
	'core/html': html,
	'core/shortcode': shortcode,
	'core/freeform': paragraph, // Classic block

	// Theme blocks
	'core/navigation': navigation,
	'core/navigation-link': customLink,
	'core/navigation-submenu': page, // Using page as fallback
	'core/navigation-overlay-close': more, // Using more as fallback
	'core/site-logo': siteLogo,
	'core/site-title': mapMarker,
	'core/site-tagline': paragraph, // Custom icon, using paragraph as fallback
	'core/query': loop,
	'core/query-title': title,
	'core/query-pagination': queryPagination,
	'core/query-pagination-next': queryPaginationNext,
	'core/query-pagination-numbers': queryPaginationNumbers,
	'core/query-pagination-previous': queryPaginationPrevious,
	'core/query-no-results': loop,
	'core/query-total': loop, // Custom icon, using loop as fallback
	'core/template-part': layout,
	'core/pattern': layout, // Pattern placeholder
	'core/avatar': commentAuthorAvatar,
	'core/post-title': title,
	'core/post-excerpt': postExcerpt,
	'core/post-featured-image': postFeaturedImage,
	'core/post-content': postContent,
	'core/post-author': postAuthor,
	'core/post-author-name': postAuthor,
	'core/post-author-biography': postAuthor,
	'core/post-comment': comment,
	'core/post-comments-count': postCommentsCount,
	'core/post-comments-link': postCommentsCount,
	'core/post-date': postDate,
	'core/post-terms': postCategories,
	'core/post-navigation-link': link, // Using link as fallback
	'core/post-template': layout,
	'core/post-time-to-read': timeToRead,
	'core/read-more': link,
	'core/comments': postComments,
	'core/comments-title': title,
	'core/comments-pagination': queryPagination,
	'core/comments-pagination-next': queryPaginationNext,
	'core/comments-pagination-numbers': queryPaginationNumbers,
	'core/comments-pagination-previous': queryPaginationPrevious,
	'core/comment-author-avatar': commentAuthorAvatar,
	'core/comment-author-name': commentAuthorName,
	'core/comment-content': commentContent,
	'core/comment-date': postDate,
	'core/comment-edit-link': commentEditLink,
	'core/comment-reply-link': commentReplyLink,
	'core/comment-template': layout,
	'core/post-comments-form': postCommentsForm,
	'core/table-of-contents': tableOfContents,
	'core/home-link': home,
	'core/loginout': login,
	'core/term-description': termDescription,
	'core/term-name': termName,
	'core/term-count': termCount,
	'core/term-template': layout,
	'core/terms-query': loop,
	'core/breadcrumbs': home, // Using home as fallback

	// Accordion blocks
	'core/accordion': accordion,
	'core/accordion-item': accordionItem,
	'core/accordion-heading': accordionHeading,
	'core/accordion-panel': contents,

	// Tab blocks
	'core/tabs': tabs,
	'core/tab': tab,
	'core/tabs-menu': tabsMenu,
	'core/tabs-menu-item': tabsMenuItem,
	'core/tab-panel': contents,

	// Details block
	'core/details': details,

	// Table block
	'core/table': blockTable,

	// Math block
	'core/math': math,

	// Icon block
	'core/icon': symbol, // Using symbol as fallback

	// Missing block (unsupported)
	'core/missing': symbol, // Using symbol as fallback

	// Page list blocks
	'core/page-list': pages,
	'core/page-list-item': page,

	// Playlist blocks
	'core/playlist': audio,
	'core/playlist-track': audio,

	// Form blocks (experimental)
	'core/form': group, // Custom icon, using group as fallback
	'core/form-input': paragraph, // Custom icon, using paragraph as fallback
	'core/form-submit-button': button,
	'core/form-submission-notification': group, // Custom icon, using group as fallback
};
