<cfcomponent>
	<!--- This function retrieves all customers from the database --->
	<cffunction name="search" hint="Gets all customer from the database" returntype="any" access="remote">
		<cfparam name="term" type="string">
		<cfparam name="data" type="string">

		<cfset states = ListToArray('Alabama,Alaska,American Samoa,Arizona,Arkansas,California,Colorado,Connecticut,Delaware,District of Columbia,Florida,Georgia,Guam,Hawaii,Idaho,Illinois,Indiana,Iowa,Kansas,Kentucky,Louisiana,Maine,Maryland,Massachusetts,Michigan,Minnesota,Mississippi,Missouri,Montana,Nebraska,Nevada,New Hampshire,New Jersey,New Mexico,New York,North Carolina,North Dakota,Northern Marianas Islands,Ohio,Oklahoma,Oregon,Pennsylvania,Puerto Rico,Rhode Island,South Carolina,South Dakota,Tennessee,Texas,Utah,Vermont,Virginia,Virgin Islands,Washington,West Virginia,Wisconsin,Wyoming')>
		<cfset qry = queryNew('id,state')>
		<cfloop index="row" from="1" to="#ArrayLen(states)#">
			<cfset queryAddRow(qry)>
			<cfset querySetCell(qry,'state',states[row])>
			<cfset querySetCell(qry,'id',row)>
		</cfloop>
		<cfif ARGUMENTS.data IS 'simple'>
			<cfquery name="getStates" dbtype="query">
				SELECT state
				FROM qry
				WHERE Lower(state) LIKE <cfqueryparam value="#LCase(ARGUMENTS.term)#%" cfsqltype="string">
				ORDER BY state ASC
			</cfquery>
			<cfset retVal = ListToArray(ValueList(getStates.state))>
		<cfelse>
			<cfquery name="getStates" dbtype="query">
				SELECT id,state
				FROM qry
				WHERE Lower(state) LIKE <cfqueryparam value="#LCase(ARGUMENTS.term)#%" cfsqltype="string">
				ORDER BY state ASC
			</cfquery>
			<cfset retVal = []>
			<cfloop query="getStates">
				<cfset tmp = {
					'label' = state,
					'value' = id
				}>
				<cfset arrayAppend(retVal, tmp)>
			</cfloop>
		</cfif>
		<cfreturn SerializeJSON(retVal)>
	</cffunction>
</cfcomponent>