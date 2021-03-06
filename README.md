# Meliorator

Web-page-injectable, configuration-free, powerful data analytics for all humans.
------

MOTIVATION
-----------

Assume you have the following problem:

	you have data in tabular form (an array of objects or other arrays, an html table)
	you want to instantly get from this data, a data-analysis panel that allow u to:

		- pick what to visualize (domain, range, series)
		- how to visualize (pie, bar, column, scatter, time-series, etc)
		- and possibly, ability to export these visualizations as images/pdf.

	you want the solution to be a plugin of sorts -- just indicate the source of the data,
	where you want the analytics panel rendered (say by css selector), and the rest is done
	automatically.

	you don't want to modify your data, instead, you expect that the plugin should be
	intelligent enough to figure out data-types, skip null or missing entries, normalize
	the data, etc


SOLUTION: the MELIORATOR (from "Meliorate" -- to make better)
--------------------------------------------------------------

This technology will allow any web page, to augement any tabular data they
already have or source from with intuitive, meaningful and robust data visualizations that can aid in explorative data analysis, and which the users themselves can tweak on the fly!

Sources of data that we propose to support include data already presented as html tables (on the same page) or as Javascript collections: array of objects or array of arrays or linked to via some URL - say from a RESTFUL API call.

This should allow visitors of web pages to no-more have to limit themselves to the visuals and analysis presented by the
content authors, but to let them tweak and play with the data themselves - changing visualization types, filtering, 
zooming, panning, etc. plus options to export the visuals as they see fit.

As of the current implementation, The Meliorator depends on JQuery (which you must include in your page prior to invoking the meliorator), and the the awesome Open Source Flot charting library and various plugins of this project (which, for the sake of convenience, we pre-load into the meliorator javascript file for you).

USAGE
-----------------------------------

As of this moment, the technology only requires a single JS file (besides the JQuery dependency) to be loaded into the page, and then the Meliorator CSS file. Thus, you can get started by including these required files as such:

        <script src="The-Meliorator/vendor/jquery.min.js"></script>
        <script src="The-Meliorator/src/meliorator.js"></script>
        <link rel="stylesheet" type="text/css" href="The-Meliorator/src/css/meliorator.css" />
		
If you plan to use the powerful, POWER-TABLE action, then you have two other options for how you might load Meliorator into your app. The first option is to load everything using HTML5's Web Components, so that all you need, is to place this in the header of you containing app:

	    <link rel="import" href="The-Meliorator/html/meliorator-imports.html"/>
		
The other option is to load the Meliorator files as before (which doesn't load the dependencies required for POWER-TABLE and other future dependencies automatically), and then optionally load the partials component like this:

        <script src="The-Meliorator/vendor/jquery.min.js"></script>
        <script src="The-Meliorator/src/meliorator.js"></script>
        <link rel="stylesheet" type="text/css" href="The-Meliorator/src/css/meliorator.css" />
		<link rel="import" href="The-Meliorator/html/meliorator-imports-partials.html"/>
		

NOTE: the loading options that use Web components require that you host Meliorator on a web-server (even if local), as that's the technical requirement to have web-components work.

After loading Meliorator, you can then invoke these any of its powers using the general syntax:

	$('JQUERY SELECTOR FOR TARGET').Meliorator('ACTION', [CONFIGURATION_OPTIONS
	

Currently, supported actions include:

	table: this takes a dataset, and renders a vanilla HTML table
	parse-table: this will reverse-engineer and existing table, and return a dataset representing its data
	analytics-panel: this takes a dataset, and renders a single analytics panel
	dashboard-panel: this takes a dataset, and renders a single analytics panel, with options to add the panels to a dashboard, preview the dashboard, save it, and load pre-existing dashboards
	
In the analytics panel and dashboard mode, Meliorator allows the client/containing app, to register callbacks in order to intercept such things as saving of a panel image, adding to dashboard, saving dashboard, showing a dashboard, etc. Check the examples and the code for more.
	
For More detailed example usage, visit [the documentation here](https://nuchwezi.github.io/The-Meliorator/).
	
SHOWCASE
----------------------

![Bar Chart](/showcase/bar-charts.png?raw=true "Bar Chart Example")
![Line Chart](/showcase/line-charts.png?raw=true "Line Chart Example")
![Pie Chart](/showcase/pie-chart.png?raw=true "Pie Chart Example")
![Tabular Chart](/showcase/table-chart.png?raw=true "Tabular Chart Example")

