<script lang="ts">
	import { resolve } from '$app/paths';
	import ImgAddSin from '$lib/assets/add-sin.png';
	import ImgCloseSins from '$lib/assets/close-sins.png';
	import ImgCommandmentVariant from '$lib/assets/commandment-variant.png';
	import ImgCreateEditSin from '$lib/assets/create-edit-sin.png';
	import ImgDeleteSin from '$lib/assets/delete-sin.png';
	import ImgPasswordField from '$lib/assets/password-field.png';
	import ImgSaveDiscardChanges from '$lib/assets/save-discard-changes.png';
	import ImgSinField from '$lib/assets/sin-field.png';
	import ImgWeightField from '$lib/assets/weight-field.png';
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
					image: ImgPasswordField,
					description:
						'Data is encrypted using this key. All data stays on your device, but even if you got a virus, it would be very hard for hackers to obtain your data, because it is encrypted'
				}
			]
		},
		{
			title: 'Overview',
			screen: ScreenKind.OVERVIEW,
			elements: [
				{
					title: 'Variant',
					image: ImgCommandmentVariant,
					description:
						"Catholics and Protestants have slightly different definitions of the 10 commandments. That's why you can configure what version you want to see here"
				},
				{
					title: 'Add sin',
					image: ImgAddSin,
					description:
						'Each sin belongs to a commandment. When you want to create a new sin, you can click the ➕ button and voila'
				},
				{
					title: 'Delete sin',
					image: ImgDeleteSin,
					description: 'You can delete a sin by clicking here'
				},
				{
					title: 'Edit/view sin',
					image: ImgCreateEditSin,
					description:
						"When you click here, you'll be able to see and edit details of the sin. If a sin is marked as mortal you'll also see a ⚠️ emoji"
				},
				{
					title: 'Close sins',
					image: ImgCloseSins,
					description:
						'Here you can see, how long it has been since you last (all) your sins. You can click this button to close all sins, and will you be greeted by an emoji storm, as a kind of happy congratulation, for (hopefully) being forgiven'
				}
			]
		},
		{
			title: 'Detail',
			screen: ScreenKind.DETAIL,
			elements: [
				{
					title: 'Weight',
					image: ImgWeightField,
					description:
						'Some sins are more bad than others, therefor you can choose whether it is only venial, or it actually is mortal. Mortal sins also get an ⚠️ emoji in the overview, so they are easier to spot'
				},
				{
					title: 'Sin',
					image: ImgSinField,
					description:
						'Here you can add a title and context for your sin. The first line is the title, it will be shown in the overview. Other lines will not be shown in the overview, but might allow you to store additional information (context, a resolution, etc.)'
				},
				{
					title: 'Discard and save',
					image: ImgSaveDiscardChanges,
					description: 'These buttons allow you to discard changes (❌) and save changes (✔️)'
				}
			]
		}
	];
</script>

<header class="main-like">
	<div class="horizontal space-between width-full">
		<h1>Documentation</h1>
		<a href={resolve('/')}>Back</a>
	</div>
	<p>
		Most of the knowledge found on this page can be figured out with common knowledge, but if you
		want to learn more, or don't quite understand something, you'll be able to find it out. The
		information is seperated by pages and elements, so you can easily follow along
	</p>
	<hr class="divider" />
	<p>
		For those who are curious and have technical knowledge, this program is open source. You can
		find it on Github, or via <a href="https://github.com/CodeBoy124/kageon">this link</a>
	</p>
	<hr class="divider" />
</header>

<main>
	<ul class="verticle">
		{#each my_docs as doc_page, index (doc_page.screen)}
			<li class="doc-page">
				{#if index != 0}
					<hr />
				{/if}
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
