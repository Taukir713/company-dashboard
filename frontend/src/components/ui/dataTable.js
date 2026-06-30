 export default function dataTable(headers = [], rows = "") { 
    return ` 
    <div class="card-box"> 
        <div class="table-wrapper"> 
            <table class="table custom-table align-middle"> 
                <thead> 
                    <tr> 
                        ${headers.map(header => ` 
                            <th>${header}</th> 
                        `).join("")} 
                    </tr> 
                </thead> 
                <tbody>  
                    ${rows} 
                </tbody> 
            </table> 
        </div> 
    </div> 
    `;
}

