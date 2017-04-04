var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(y){return typeof y}:function(y){return y&&"function"==typeof Symbol&&y.constructor===Symbol&&y!==Symbol.prototype?"symbol":typeof y};(function(y){"object"===("undefined"==typeof module?"undefined":_typeof(module))&&module.exports?module.exports=y:y(Highcharts)})(function(y){var F,z=y.win.document,A=y.each,B=y.pick,C=y.inArray,D=y.isNumber,E=y.splat,G=function(I,J){this.init(I,J)};y.extend(G.prototype,{init:function(I,J){this.options=I,this.chartOptions=J,this.columns=I.columns||this.rowsToColumns(I.rows)||[],this.firstRowAsNames=B(I.firstRowAsNames,!0),this.decimalRegex=I.decimalPoint&&RegExp("^(-?[0-9]+)"+I.decimalPoint+"([0-9]+)$"),this.rawColumns=[],this.columns.length?this.dataFound():(this.parseCSV(),this.parseTable(),this.parseGoogleSpreadsheet())},getColumnDistribution:function(){var Q,I=this.chartOptions,J=this.options,K=[],L=function(S){return(y.seriesTypes[S||"line"].prototype.pointArrayMap||[0]).length},M=I&&I.chart&&I.chart.type,N=[],O=[],P=0;A(I&&I.series||[],function(R){N.push(L(R.type||M))}),A(J&&J.seriesMapping||[],function(R){K.push(R.x||0)}),0===K.length&&K.push(0),A(J&&J.seriesMapping||[],function(R){var T,S=new F,U=N[P]||L(M),V=y.seriesTypes[((I&&I.series||[])[P]||{}).type||M||"line"].prototype.pointArrayMap||["y"];for(T in S.addColumnReader(R.x,"x"),R)R.hasOwnProperty(T)&&"x"!==T&&S.addColumnReader(R[T],T);for(Q=0;Q<U;Q++)S.hasReader(V[Q])||S.addColumnReader(void 0,V[Q]);O.push(S),P++}),J=y.seriesTypes[M||"line"].prototype.pointArrayMap,void 0===J&&(J=["y"]),this.valueCount={global:L(M),xColumns:K,individual:N,seriesBuilders:O,globalPointArrayMap:J}},dataFound:function(){this.options.switchRowsAndColumns&&(this.columns=this.rowsToColumns(this.columns)),this.getColumnDistribution(),this.parseTypes(),!1!==this.parsed()&&this.complete()},parseCSV:function(){var Q,R,I=this,J=this.options,K=J.csv,L=this.columns,M=J.startRow||0,N=J.endRow||Number.MAX_VALUE,O=J.startColumn||0,P=J.endColumn||Number.MAX_VALUE,S=0;K&&(R=K.replace(/\r\n/g,"\n").replace(/\r/g,"\n").split(J.lineDelimiter||"\n"),Q=J.itemDelimiter||(-1===K.indexOf("\t")?",":"\t"),A(R,function(T,U){var V=I.trim(T),W=0===V.indexOf("#");U>=M&&U<=N&&!W&&""!==V&&(V=T.split(Q),A(V,function(X,Y){Y>=O&&Y<=P&&(L[Y-O]||(L[Y-O]=[]),L[Y-O][S]=X)}),S+=1)}),this.dataFound())},parseTable:function(){var I=this.options,J=I.table,K=this.columns,L=I.startRow||0,M=I.endRow||Number.MAX_VALUE,N=I.startColumn||0,O=I.endColumn||Number.MAX_VALUE;J&&("string"==typeof J&&(J=z.getElementById(J)),A(J.getElementsByTagName("tr"),function(P,Q){Q>=L&&Q<=M&&A(P.children,function(R,S){("TD"===R.tagName||"TH"===R.tagName)&&S>=N&&S<=O&&(K[S-N]||(K[S-N]=[]),K[S-N][Q-L]=R.innerHTML)})}),this.dataFound())},parseGoogleSpreadsheet:function(){var Q,R,I=this,J=this.options,K=J.googleSpreadsheetKey,L=this.columns,M=J.startRow||0,N=J.endRow||Number.MAX_VALUE,O=J.startColumn||0,P=J.endColumn||Number.MAX_VALUE;K&&jQuery.ajax({dataType:"json",url:"https://spreadsheets.google.com/feeds/cells/"+K+"/"+(J.googleSpreadsheetWorksheet||"od6")+"/public/values?alt=json-in-script&callback=?",error:J.error,success:function(T){var U,Y,T=T.feed.entry,V=T.length,W=0,X=0;for(Y=0;Y<V;Y++)U=T[Y],W=Math.max(W,U.gs$cell.col),X=Math.max(X,U.gs$cell.row);for(Y=0;Y<W;Y++)Y>=O&&Y<=P&&(L[Y-O]=[],L[Y-O].length=Math.min(X,N-M));for(Y=0;Y<V;Y++)(U=T[Y],Q=U.gs$cell.row-1,R=U.gs$cell.col-1,R>=O&&R<=P&&Q>=M&&Q<=N)&&(L[R-O][Q-M]=U.content.$t);A(L,function(Z){for(Y=0;Y<Z.length;Y++)void 0===Z[Y]&&(Z[Y]=null)}),I.dataFound()}})},trim:function(I,J){return"string"==typeof I&&(I=I.replace(/^\s+|\s+$/g,""),J&&/^[0-9\s]+$/.test(I)&&(I=I.replace(/\s/g,"")),this.decimalRegex&&(I=I.replace(this.decimalRegex,"$1.$2"))),I},parseTypes:function(){for(var I=this.columns,J=I.length;J--;)this.parseColumn(I[J],J)},parseColumn:function(I,J){var N,O,P,Q,V,K=this.rawColumns,L=this.columns,M=I.length,R=this.firstRowAsNames,S=-1!==C(J,this.valueCount.xColumns),T=[],U=this.chartOptions,W=(this.options.columnTypes||[])[J],U=S&&(U&&U.xAxis&&"category"===E(U.xAxis)[0].type||"string"===W);for(K[J]||(K[J]=[]);M--;)(N=T[M]||I[M],P=this.trim(N),Q=this.trim(N,!0),O=parseFloat(Q),void 0===K[J][M]&&(K[J][M]=P),U||0===M&&R)?I[M]=P:+Q===O?(I[M]=O,31536E6<O&&"float"!==W?I.isDatetime=!0:I.isNumeric=!0,void 0!==I[M+1]&&(V=O>I[M+1])):(O=this.parseDate(N),S&&D(O)&&"float"!==W)?(T[M]=N,I[M]=O,I.isDatetime=!0,void 0!==I[M+1])&&(N=O>I[M+1],N!==V&&void 0!==V&&(this.alternativeFormat?(this.dateFormat=this.alternativeFormat,M=I.length,this.alternativeFormat=this.dateFormats[this.dateFormat].alternative):I.unsorted=!0),V=N):(I[M]=""===P?null:P,0!==M&&(I.isDatetime||I.isNumeric))&&(I.mixed=!0);if(S&&I.mixed&&(L[J]=K[J]),S&&V&&this.options.sort)for(J=0;J<L.length;J++)L[J].reverse(),R&&L[J].unshift(L[J].pop())},dateFormats:{"YYYY-mm-dd":{regex:/^([0-9]{4})[\-\/\.]([0-9]{2})[\-\/\.]([0-9]{2})$/,parser:function(I){return Date.UTC(+I[1],I[2]-1,+I[3])}},"dd/mm/YYYY":{regex:/^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/,parser:function(I){return Date.UTC(+I[3],I[2]-1,+I[1])},alternative:"mm/dd/YYYY"},"mm/dd/YYYY":{regex:/^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/,parser:function(I){return Date.UTC(+I[3],I[1]-1,+I[2])}},"dd/mm/YY":{regex:/^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/,parser:function(I){return Date.UTC(+I[3]+2E3,I[2]-1,+I[1])},alternative:"mm/dd/YY"},"mm/dd/YY":{regex:/^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/,parser:function(I){return Date.UTC(+I[3]+2E3,I[1]-1,+I[2])}}},parseDate:function(I){var K,L,N,J=this.options.parseDate,M=this.options.dateFormat||this.dateFormat;if(J)K=J(I);else if("string"==typeof I){if(M)J=this.dateFormats[M],(N=I.match(J.regex))&&(K=J.parser(N));else for(L in this.dateFormats)if(J=this.dateFormats[L],N=I.match(J.regex)){this.dateFormat=L,this.alternativeFormat=J.alternative,K=J.parser(N);break}N||(N=Date.parse(I),"object"===("undefined"==typeof N?"undefined":_typeof(N))&&null!==N&&N.getTime?K=N.getTime()-6E4*N.getTimezoneOffset():D(N)&&(K=N-6E4*new Date(N).getTimezoneOffset()))}return K},rowsToColumns:function(I){var J,K,L,M,N;if(I)for(N=[],K=I.length,J=0;J<K;J++)for(M=I[J].length,L=0;L<M;L++)N[L]||(N[L]=[]),N[L][J]=I[J][L];return N},parsed:function(){if(this.options.parsed)return this.options.parsed.call(this,this.columns)},getFreeIndexes:function(I,J){var K,L,O,M=[],N=[];for(L=0;L<I;L+=1)M.push(!0);for(K=0;K<J.length;K+=1)for(O=J[K].getReferencedColumnIndexes(),L=0;L<O.length;L+=1)M[O[L]]=!1;for(L=0;L<M.length;L+=1)M[L]&&N.push(L);return N},complete:function(){var J,L,M,N,O,Q,I=this.columns,K=this.options,P=[];if(K.complete||K.afterComplete){for(N=0;N<I.length;N++)this.firstRowAsNames&&(I[N].name=I[N].shift());for(L=[],M=this.getFreeIndexes(I.length,this.valueCount.seriesBuilders),N=0;N<this.valueCount.seriesBuilders.length;N++)Q=this.valueCount.seriesBuilders[N],Q.populateColumns(M)&&P.push(Q);for(;0<M.length;){for(Q=new F,Q.addColumnReader(0,"x"),N=C(0,M),-1!==N&&M.splice(N,1),N=0;N<this.valueCount.global;N++)Q.addColumnReader(void 0,this.valueCount.globalPointArrayMap[N]);Q.populateColumns(M)&&P.push(Q)}if(0<P.length&&0<P[0].readers.length&&(Q=I[P[0].readers[0].columnIndex],void 0!==Q&&(Q.isDatetime?J="datetime":Q.isNumeric||(J="category"))),"category"===J)for(N=0;N<P.length;N++)for(Q=P[N],M=0;M<Q.readers.length;M++)"x"===Q.readers[M].configName&&(Q.readers[M].configName="name");for(N=0;N<P.length;N++){for(Q=P[N],M=[],O=0;O<I[0].length;O++)M[O]=Q.read(I,O);L[N]={data:M},Q.name&&(L[N].name=Q.name),"category"===J&&(L[N].turboThreshold=0)}I={series:L},J&&(I.xAxis={type:J}),K.complete&&K.complete(I),K.afterComplete&&K.afterComplete(I)}}}),y.Data=G,y.data=function(H,I){return new G(H,I)},y.wrap(y.Chart.prototype,"init",function(H,I,J){var K=this;I&&I.data?y.data(y.extend(I.data,{afterComplete:function(M){var N,O;if(I.hasOwnProperty("series"))if("object"===_typeof(I.series))for(N=Math.max(I.series.length,M.series.length);N--;)O=I.series[N]||{},I.series[N]=y.merge(O,M.series[N]);else delete I.series;I=y.merge(M,I),H.call(K,I,J)}}),I):H.call(K,I,J)}),F=function(){this.readers=[],this.pointIsArray=!0},F.prototype.populateColumns=function(H){var I=!0;return A(this.readers,function(J){void 0===J.columnIndex&&(J.columnIndex=H.shift())}),A(this.readers,function(J){void 0===J.columnIndex&&(I=!1)}),I},F.prototype.read=function(H,I){var L,J=this.pointIsArray,K=J?[]:{};return A(this.readers,function(M){var N=H[M.columnIndex][I];J?K.push(N):K[M.configName]=N}),void 0===this.name&&2<=this.readers.length&&(L=this.getReferencedColumnIndexes(),2<=L.length)&&(L.shift(),L.sort(),this.name=H[L.shift()].name),K},F.prototype.addColumnReader=function(H,I){this.readers.push({columnIndex:H,configName:I}),"x"===I||"y"===I||void 0===I||(this.pointIsArray=!1)},F.prototype.getReferencedColumnIndexes=function(){var H,J,I=[];for(H=0;H<this.readers.length;H+=1)J=this.readers[H],void 0!==J.columnIndex&&I.push(J.columnIndex);return I},F.prototype.hasReader=function(H){var I,J;for(I=0;I<this.readers.length;I+=1)if(J=this.readers[I],J.configName===H)return!0}});