import React from "react";

// components
import { About } from "../Components/layouts/";

// params
import { PARAMS_HEATMAP } from "../params";

const aboutParams = PARAMS_HEATMAP.PAGE.about;


const AboutBLS = () => {
	return (
		<section>
			<About>
				{aboutParams.map(sec => (
					<div key={sec.title}>
						<h2>{sec.title}</h2>
						<p>{sec.text}</p>
						{sec.list
							&& <ul>
								{sec.list.map(item => (
									<li key={item.id}>{item.text}</li>
								))}
							</ul>
						}
					</div>
				))}
			</About>
		</section>
	)
};

export default AboutBLS;
