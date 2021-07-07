$(document).ready(function () {
  const url = $('#dataTable').attr('url');
  const parsUrl = url.split('/')[1];

  $.ajax({
    type: 'GET',
    url,
    dataType: 'json',
    success: function (response) {
      if (parsUrl != 'dashboard') {
        response.columns.push({
          data: 'id',
          title: '',
          searchable: false,
          sortable: false,
          render: function (id, type, full, meta) {
            const name = full.name;
            return `<span>
            <a href="/${parsUrl}/detail/${id}" title="Detail ${name}" id="${id}"><i class="bi bi-arrow-down-up"></i></a>
            | 
            <a href="/${parsUrl}/form/${id}" title="Edit ${name}" id="${id}"><i class="bi bi-pencil"></i></a>
            | 
            <a
              href="/${parsUrl}/delete/${id}"
              onclick="return confirm('Anda yakin ingin menghapus item ini?');"
              title="Delete ${full.name}"
              id="${id}"
              ><i class="bi bi-trash text-danger"></i></a>
            </span>
          
                `;
          },
        });
      }

      $('#dataTable').DataTable({
        rowReorder: {
          selector: 'td:nth-child(2)',
        },
        processing: true,
        retrieve: true,
        responsive: true,
        // dom: "Blrtip",
        data: response.data,
        columns: response.columns,
      });
    },
  });
});
