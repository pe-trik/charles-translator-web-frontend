import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
	AppBar,
	Button,
	IconButton,
	Snackbar,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import {
	Check as CheckIcon,
	Close as CloseIcon,
	Info as InfoIcon,
} from "@mui/icons-material";

import AboutUsDialog from "./AboutUsDialog";
import FAQDialog from "./FAQDialog";
import SettingsDialog from "./SettingsDialog";

import styles from "./layout.module.scss"


function Layout({ children }) {
	const [collectionSnackbar, setCollectionSnackbar] = useState(true);
	const [forOrganizations, setForOrganizations] = useState(false);
	const [notOfficialDeplo, setNotOfficialDeplo] = useState(false);
	
	useEffect(() => setCollectionSnackbar(localStorage.getItem("collectDataConsentValue") !== "true"),[])
	useEffect(() => setNotOfficialDeplo(
		window.location.href.indexOf("lindat.cz/translation") === -1 &&
		window.location.href.indexOf("translator.cuni.cz") === -1
	),[])
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => setForOrganizations((localStorage.getItem("organizationName") || "").length !== 0))

	const allowCollection = () => { 
		setCollectionSnackbar(false);
		if(typeof window !== 'undefined')
			window.localStorage.setItem("collectDataConsentValue", "true");
	}

	return (
		<div>
			<CssBaseline />
			<div className={styles.container}>
				<AppBar
					position="static"
					className={styles.header}
					elevation={0}
				>
					<Toolbar className={styles.toolbar}>
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1, ml: 1 }}
							color="white"
						>
							<div className={styles.flagsContainer}>

								<div>Charles Translator for Ukraine</div>
							</div>
						</Typography>
						<AboutUsDialog/>
						<FAQDialog/>
						<SettingsDialog/>
					</Toolbar>
					{notOfficialDeplo && <div className={styles.notOfficialDeplo}>
						<a href="https://lindat.cz/translation">
							🚧🚧This version is not for public, please click here.🚧🚧 
						</a>
						<IconButton
							onClick={()=>setNotOfficialDeplo(false)}
						>
							<CloseIcon />
						</IconButton>
					</div>}
				</AppBar>

				{children}

				<Snackbar
					open={collectionSnackbar}
					message={`Souhlasím s tím, aby Ústav formální a aplikované lingvistiky
						MFF UK ukládal vstupy a výstupy z překladače. V případě souhlasu
						mohou být anonymizované texty využity pro další vývoj systému.`}
					anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
					action={(
						<React.Fragment>
							<Button size="large" onClick={allowCollection}>
								<CheckIcon fontSize="small" />
								SOUHLASÍM
							</Button>
							<Button size="large" onClick={() => setCollectionSnackbar(false)}>
								<CloseIcon fontSize="small" />
								NESOUHLASÍM
							</Button>
						</React.Fragment>
					)}
				/>

				<div className={styles.footer}>
					THE LINDAT/CLARIAH-CZ PROJECT (LM2018101; formerly
					LM2010013, LM2015071) IS FULLY SUPPORTED BY THE MINISTRY OF
					EDUCATION, SPORTS AND YOUTH OF THE CZECH REPUBLIC UNDER THE
					PROGRAMME LM OF LARGE INFRASTRUCTURES
				</div>
			</div>
		</div>
	);
}

export default Layout;
