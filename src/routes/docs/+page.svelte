<script lang="ts">
	import { ScreenKind } from '$lib/types';

	interface DocElement {
		title: string;
		image: string;
		description: string;
	}

	type DocPage = {
		title: string;
		screen: ScreenKind;
		elements: DocElement[];
	};

	type DocAll = DocPage[];

	const my_docs: DocAll = [
		{
			title: 'Welcome',
			screen: ScreenKind.PASSWORD,
			elements: [
				{
					title: 'Password field',
					image: 'https://dummyimage.com/300', // TODO
					description:
						"This website encrypts it's data using this key. The website keeps all data on your device, but even if a virus would be on there, it would be very hard for hackers to obtain your data"
				},
				{
					title: 'Password field2',
					image: 'https://dummyimage.com/300', // TODO
					description:
						"This website encrypts it's data using this key. The website keeps all data on your device, but even if a virus would be on there, it would be very hard for hackers to obtain your data"
				}
			]
		},
		{
			title: 'Overview',
			screen: ScreenKind.OVERVIEW,
			elements: [
				{
					title: 'Password field',
					image: 'https://dummyimage.com/300', // TODO
					description:
						"This website encrypts it's data using this key. The website keeps all data on your device, but even if a virus would be on there, it would be very hard for hackers to obtain your data"
				},
				{
					title: 'Password field2',
					image: 'https://dummyimage.com/300', // TODO
					description:
						"This website encrypts it's data using this key. The website keeps all data on your device, but even if a virus would be on there, it would be very hard for hackers to obtain your data"
				}
			]
		}
	];
</script>

<main>
	<ul class="verticle">
		{#each my_docs as doc_page (doc_page.screen)}
			<li>
				<h2 class="doc-page-title">"{doc_page.title}" page</h2>
				<ul class="doc-element-container">
					{#each doc_page.elements as doc_element (doc_element.title)}
						<li class="doc-element">
							<img src={doc_element.image} alt="" />
							<div class="doc-element-desc">
								<h3>{doc_element.title}</h3>
								<p>{doc_element.description}</p>
							</div>
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</main>
